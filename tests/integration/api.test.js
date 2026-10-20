// Tests d'intégration : vraie base PostgreSQL (suivisse_test), vraies routes Express.
const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../helpers/app');
const sequelize = require('../../app/database');
const { User, Role, Statement } = require('../../app/models/associations');

let adminToken, userToken, userId, adminId, eventId;

beforeAll(async () => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});

  // On repart d'une base vide à chaque exécution
  await sequelize.query('TRUNCATE "statement", "user", "role" RESTART IDENTITY CASCADE');
  const [visitor, user, admin] = await Role.bulkCreate([
    { title: 'visitor' }, { title: 'user' }, { title: 'admin' },
  ]);
  const admin1 = await User.create({
    enterprise: 'DOD', email: 'admin@test.fr', firstname: 'Willem', lastname: 'Feval',
    password: bcrypt.hashSync('Admin-123', 10), position: 'Responsable SSE',
    process: 'SSE', roleId: admin.id,
  });
  const user1 = await User.create({
    enterprise: 'DOA', email: 'jean@test.fr', firstname: 'Jean', lastname: 'Dupont',
    password: bcrypt.hashSync('Chantier-1', 10), position: 'Chef de chantier',
    process: 'Production', roleId: user.id,
  });
  adminId = admin1.id;
  userId = user1.id;
});

afterAll(async () => {
  await sequelize.close();
});

describe('POST /api/login', () => {
  test("connexion de l'administrateur : 200 + jeton JWT", async () => {
    const res = await request(app).post('/api/login').send({ email: 'admin@test.fr', password: 'Admin-123' });
    expect(res.status).toBe(200);
    expect(res.body.authToken).toBeDefined();
    adminToken = res.body.authToken;
  });

  test('mauvais mot de passe : 401', async () => {
    const res = await request(app).post('/api/login').send({ email: 'admin@test.fr', password: 'Faux-1234' });
    expect(res.status).toBe(401);
    expect(res.body.authToken).toBeUndefined();
  });

  test('email inconnu : 401', async () => {
    const res = await request(app).post('/api/login').send({ email: 'inconnu@test.fr', password: 'Admin-123' });
    expect(res.status).toBe(401);
  });

  test('première connexion utilisateur : demande de changer le mot de passe', async () => {
    const res = await request(app).post('/api/login').send({ email: 'jean@test.fr', password: 'Chantier-1' });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('First login - Change password');
    expect(res.body.userId).toBe(userId);
    expect(res.body.authToken).toBeUndefined();
  });
});

describe('POST /api/change-password/:id', () => {
  test('refuse un mot de passe trop faible : 400', async () => {
    const res = await request(app).post(`/api/change-password/${userId}`).send({ password: 'faible' });
    expect(res.status).toBe(400);
  });

  test('accepte un mot de passe valide, le stocke haché, puis la connexion donne un jeton', async () => {
    const res = await request(app).post(`/api/change-password/${userId}`).send({ password: 'Nouveau-9@A' });
    expect(res.status).toBe(200);

    const enBase = await User.unscoped().findByPk(userId);
    expect(enBase.password).not.toBe('Nouveau-9@A');
    expect(bcrypt.compareSync('Nouveau-9@A', enBase.password)).toBe(true);
    expect(enBase.password_changed).toBe(true);

    const login = await request(app).post('/api/login').send({ email: 'jean@test.fr', password: 'Nouveau-9@A' });
    expect(login.status).toBe(200);
    expect(login.body.authToken).toBeDefined();
    userToken = login.body.authToken;
  });

  test('utilisateur inexistant : 404', async () => {
    const res = await request(app).post('/api/change-password/9999').send({ password: 'Nouveau-9' });
    expect(res.status).toBe(404);
  });
});

describe('Protection des routes par rôle', () => {
  test('GET /api/events sans jeton : 401', async () => {
    const res = await request(app).get('/api/events');
    expect(res.status).toBe(401);
  });

  test('GET /api/users avec un jeton utilisateur : 403', async () => {
    const res = await request(app).get('/api/users').set('Authorization', `Bearer ${userToken}`);
    expect(res.status).toBe(403);
  });

  test('GET /api/users avec un jeton administrateur : 200 et liste des utilisateurs avec leur rôle', async () => {
    const res = await request(app).get('/api/users').set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].role.title).toBeDefined();
  });
});

describe('Événements', () => {
  const valide = {
    site_name: 'Tour Karras', site_number: 56897, site_town: 'Rouen',
    witness: 'Céleste', event_description: 'Harnais non porté sur une nacelle',
    info_sse_description: 'Rappel fait',
  };

  test('création sans champ obligatoire : 400', async () => {
    const res = await request(app).post('/api/events').set('Authorization', `Bearer ${userToken}`)
      .send({ site_name: 'Tour Karras' });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/site_number/);
  });

  test("création valide : 201, rattachée à l'utilisateur du jeton", async () => {
    const res = await request(app).post('/api/events').set('Authorization', `Bearer ${userToken}`).send(valide);
    expect(res.status).toBe(201);
    const enBase = await Statement.findOne({ where: { site_name: 'Tour Karras' } });
    expect(enBase).not.toBeNull();
    expect(enBase.user_id).toBe(userId);
    eventId = enBase.id;
  });

  test('GET /api/events : la liste contient la déclaration et son auteur', async () => {
    const res = await request(app).get('/api/events').set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.events).toHaveLength(1);
    expect(res.body.events[0].user.email).toBe('jean@test.fr');
  });

  test('GET /api/events/:id : 200 puis 404 puis 400', async () => {
    const ok = await request(app).get(`/api/events/${eventId}`).set('Authorization', `Bearer ${userToken}`);
    expect(ok.status).toBe(200);
    const absent = await request(app).get('/api/events/9999').set('Authorization', `Bearer ${userToken}`);
    expect(absent.status).toBe(404);
    const invalide = await request(app).get('/api/events/abc').set('Authorization', `Bearer ${userToken}`);
    expect(invalide.status).toBe(400);
  });

  test("événements d'un utilisateur donné", async () => {
    const res = await request(app).get(`/test/user-events/${userId}`).set('Authorization', `Bearer ${userToken}`);
    expect(res.status).toBe(200);
    expect(res.body.events).toHaveLength(1);
  });

  test('modification : seuls les champs fournis changent', async () => {
    const res = await request(app).patch(`/test/events/${eventId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ site_town: 'Le Havre', user_id: userId });
    expect(res.status).toBe(200);
    const enBase = await Statement.findByPk(eventId);
    expect(enBase.site_town).toBe('Le Havre');
    expect(enBase.site_name).toBe('Tour Karras');
  });

  test('suppression : 204, puis 404 si on la redemande', async () => {
    const res = await request(app).delete(`/test/events/${eventId}`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.status).toBe(204);
    expect(await Statement.findByPk(eventId)).toBeNull();
    const encore = await request(app).delete(`/test/events/${eventId}`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(encore.status).toBe(404);
  });
});

describe('Gestion des utilisateurs', () => {
  test("suppression d'un utilisateur sans événement : 200", async () => {
    const tmp = await User.create({
      enterprise: 'DOD', email: 'tmp@test.fr', firstname: 'T', lastname: 'Mp',
      password: 'x', position: 'p', process: 'p', roleId: 2,
    });
    const res = await request(app).delete(`/test/users/${tmp.id}`);
    expect(res.status).toBe(200);
    expect(await User.findByPk(tmp.id)).toBeNull();
  });

  test('suppression : utilisateur inexistant : 404', async () => {
    const res = await request(app).delete('/test/users/9999');
    expect(res.status).toBe(404);
  });
});

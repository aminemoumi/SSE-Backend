const jwt = require('jsonwebtoken');
const requireUser = require('../../app/middlewares/requireUser');
const requireAdmin = require('../../app/middlewares/requireAdmin');

function fauxRes() {
  return {
    statusCode: null,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(data) { this.body = data; return this; },
  };
}
const jeton = (role) => 'Bearer ' + jwt.sign({ userId: 1, userRole: role }, process.env.JWT_SECRET);

describe('requireUser', () => {
  test('401 sans jeton', () => {
    const res = fauxRes(); const next = jest.fn();
    requireUser({ headers: {} }, res, next);
    expect(res.statusCode).toBe(401);
    expect(next).not.toHaveBeenCalled();
  });

  test('401 avec un jeton signé avec une mauvaise clé', () => {
    const faux = 'Bearer ' + jwt.sign({ userId: 1, userRole: 'admin' }, 'mauvaise_cle');
    const res = fauxRes(); const next = jest.fn();
    requireUser({ headers: { authorization: faux } }, res, next);
    expect(res.statusCode).toBe(401);
    expect(next).not.toHaveBeenCalled();
  });

  test.each(['user', 'admin'])('laisse passer le rôle %s', (role) => {
    const req = { headers: { authorization: jeton(role) } };
    const next = jest.fn();
    requireUser(req, fauxRes(), next);
    expect(next).toHaveBeenCalled();
    expect(req.user.userRole).toBe(role);
  });

  test('403 pour le rôle visitor', () => {
    const res = fauxRes(); const next = jest.fn();
    requireUser({ headers: { authorization: jeton('visitor') } }, res, next);
    expect(res.statusCode).toBe(403);
    expect(next).not.toHaveBeenCalled();
  });
});

describe('requireAdmin', () => {
  test('laisse passer un administrateur', () => {
    const next = jest.fn();
    requireAdmin({ headers: { authorization: jeton('admin') } }, fauxRes(), next);
    expect(next).toHaveBeenCalled();
  });

  test('403 pour un simple utilisateur', () => {
    const res = fauxRes(); const next = jest.fn();
    requireAdmin({ headers: { authorization: jeton('user') } }, res, next);
    expect(res.statusCode).toBe(403);
    expect(next).not.toHaveBeenCalled();
  });

  test('401 sans jeton', () => {
    const res = fauxRes();
    requireAdmin({ headers: {} }, res, jest.fn());
    expect(res.statusCode).toBe(401);
  });
});

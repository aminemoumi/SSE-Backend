const passwordValidator = require('../../app/middlewares/passwordValidator');

// Faux objets req/res pour tester le middleware sans serveur
function appeler(password) {
  const req = { body: { password } };
  const res = {
    statusCode: null,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(data) { this.body = data; return this; },
  };
  const next = jest.fn();
  return passwordValidator(req, res, next).then(() => ({ res, next }));
}

describe('passwordValidator', () => {
  test('accepte un mot de passe conforme (appelle next)', async () => {
    const { res, next } = await appeler('Facile-26');
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toBeNull();
  });

  test('refuse un mot de passe de moins de 8 caractères (400)', async () => {
    const { res, next } = await appeler('Ab-1');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/at least 8 characters/);
    expect(next).not.toHaveBeenCalled();
  });

  test.each([
    ['sans majuscule', 'facile-26x'],
    ['sans minuscule', 'FACILE-26X'],
    ['sans chiffre', 'Facile-xyz'],
    ['sans caractère spécial', 'Facile26xx'],
  ])('refuse un mot de passe %s (400)', async (_, mdp) => {
    const { res, next } = await appeler(mdp);
    expect(res.statusCode).toBe(400);
    expect(next).not.toHaveBeenCalled();
  });
});

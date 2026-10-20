const bcrypt = require('bcrypt');
const hashPassword = require('../../app/middlewares/hashPassword');

describe('hashPassword', () => {
  test('place un hash bcrypt dans req.hashedPassword, différent du mot de passe', () => {
    const req = { body: { password: 'Facile-26' } };
    const next = jest.fn();
    hashPassword(req, {}, next);

    expect(next).toHaveBeenCalled();
    expect(req.hashedPassword).not.toBe('Facile-26');
    expect(bcrypt.compareSync('Facile-26', req.hashedPassword)).toBe(true);
    expect(bcrypt.compareSync('autre', req.hashedPassword)).toBe(false);
  });

  test('deux hachages du même mot de passe sont différents (sel aléatoire)', () => {
    const r1 = { body: { password: 'Facile-26' } };
    const r2 = { body: { password: 'Facile-26' } };
    hashPassword(r1, {}, () => {});
    hashPassword(r2, {}, () => {});
    expect(r1.hashedPassword).not.toBe(r2.hashedPassword);
  });

  test('renvoie 500 si le mot de passe est absent', () => {
    const jsonMock = jest.fn();
    const res = { status: jest.fn(() => ({ json: jsonMock })) };
    jest.spyOn(console, 'error').mockImplementation(() => {});
    hashPassword({ body: {} }, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(500);
    console.error.mockRestore();
  });
});

// Variables d'environnement utilisées uniquement pendant les tests
process.env.JWT_SECRET = 'secret_de_test';
process.env.DATABASE_URL =
  process.env.DATABASE_URL_TEST || 'postgres://suivisse:suivisse@localhost/suivisse_test';

# Tests du back-end SUIVI SSE

Prérequis : PostgreSQL local, un rôle `suivisse` (mot de passe `suivisse`) et une base `suivisse_test`.

```bash
createdb -U suivisse suivisse_test
psql -U suivisse suivisse_test -f data/create.sql
psql -U suivisse suivisse_test -f migrations/add_password_changed.sql
npm install
npm test                       # lance Jest (unitaires + intégration + NoSQL)
npx jest --coverage --collectCoverageFrom='app/**/*.js'   # avec couverture
```

- `tests/unit` : middlewares (validation du mot de passe, hachage, contrôle des rôles), sans base de données.
- `tests/integration` : routes Express réelles + vraie base PostgreSQL (supertest).

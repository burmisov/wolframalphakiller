**prep**

1. npm install

**dev**

1. execute `docker run -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=wolframalphakiller -d --name wak-postgres -p 5432:5432 postgres`
2. npm run dev

**prod**

1. execute `docker-compose up -d`

_to check_

1. **GET** /api/calc/divide
2. `docker exec -it <psql_container> psql -U postgres`
3. `\c wolframalphakiller`
4. `select * from logs;`
5. you should see log entries

**tests**

1. npm run test

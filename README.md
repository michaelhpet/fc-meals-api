# FoodCourt Meals API

CRUD Operations for meals using PostgreSQL, Knex.js, and Objection.js in NestJS

## Steps to run server

#### Clone this repository

```
git@github.com:michaelhpet/fc-meals-api.git
cd fc-meals-api
```

#### Install dependencies

```
npm install
```

#### Create `.env` file (reference `.env.example`)

```
cp .env.example .env
```

#### Fill-in variables in `.env` file

```
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
```

#### Start the server

```
npm start
```

#### Check OpenAPI spec descriptions for available endpoints

```
open localhost:3000/docs
```

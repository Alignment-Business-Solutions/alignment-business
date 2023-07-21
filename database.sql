-- DATABASE NAME: abs


-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "access_level" INTEGER NOT NULL DEFAULT(0)
);

CREATE TABLE "client" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES "user",
	"accountant_id" INTEGER REFERENCES "accountant"
);

CREATE TABLE "accountants" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES "user",
	"first_name" TEXT NOT NULL,
	"last_name" TEXT NOT NULL
);

CREATE TABLE "transactions" (
	"id" SERIAL PRIMARY KEY,
	"date" DATE NOT NULL,
	"payee" TEXT NOT NULL,
	"amount" MONEY NOT NULL,
	"paid" BOOLEAN NOT NULL DEFAULT(false),
	"client_id" INTEGER REFERENCES "client" NOT NULL,
	"week_id" INTEGER REFERENCES "weeks" NOT NULL,
	"category_id" INTEGER REFERENCES "categories"
);

CREATE TABLE "weeks" (
	"id" SERIAL PRIMARY KEY,
	"start_date" DATE UNIQUE
);

CREATE TABLE "categories" (
	"id" SERIAL PRIMARY KEY,
	"category" TEXT
);


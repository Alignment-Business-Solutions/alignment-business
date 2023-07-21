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

CREATE TABLE "accountants" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES "user",
	"first_name" TEXT NOT NULL,
	"last_name" TEXT NOT NULL
);

CREATE TABLE "client" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES "user",
	"accountant_id" INTEGER REFERENCES "accountants",
	"company_name" TEXT NOT NULL
);

CREATE TABLE "weeks" (
	"id" SERIAL PRIMARY KEY,
	"start_date" DATE UNIQUE
);

CREATE TABLE "categories" (
	"id" SERIAL PRIMARY KEY,
	"category" TEXT
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

INSERT INTO "categories" ("category") VALUES
	('income'),
	('expense');
	
INSERT INTO "weeks" ("start_date") VALUES
	('2023-05-01'),
	('2023-05-08'),
	('2023-05-15'),
	('2023-05-22');
	
INSERT INTO "accountants" ("user_id", "first_name", "last_name") VALUES
	('1', 'adam', 'steven');
	
INSERT INTO "client" ("user_id", "accountant_id", "company_name") VALUES
	('2', '1', 'Test Company');
	
INSERT INTO "transactions" ("date", "payee", "amount", "paid", "client_id", "week_id", "category_id") VALUES
	('2023-05-01', 'Affiliate - Buzzelli', '33', 'true', '1', '1', '1'),
	('2023-05-01', 'BCU (1/3)', '315', 'true', '1', '1', '1'),
	('2023-05-01', 'BMC (2/6)', '1500', 'true', '1', '1', '1'),
	('2023-05-01', 'Clean Door', '600', 'true', '1', '1', '1'),
	('2023-05-01', 'OTT (2/3)', '1387.50', 'true', '1', '1', '1'),
	('2023-05-01', 'SWB (Promo)', '3500', 'true', '1', '1', '1'),
	('2023-05-01', 'SWB (Promo)', '3564.65', 'true', '1', '1', '1'),
	('2023-05-01', 'SWB (ecomm)', '995', 'true', '1', '1', '1'),
	('2023-05-01', 'SWB (design)', '397.63', 'true', '1', '1', '1'),
	('2023-05-01', 'R3Score', '195', 'true', '1', '1', '1'),
	('2023-05-01', 'Caldwell (QL)', '2500', 'true', '1', '1', '1');
	
INSERT INTO "transactions" ("date", "payee", "amount", "paid", "client_id", "week_id", "category_id") VALUES
	('2023-05-01', 'Frontitude', '108.12', 'true', '1', '1', '2'),
	('2023-05-01', 'Ubersuggest', '29', 'true', '1', '1', '2'),
	('2023-05-01', 'Apple.com', '13.77', 'true', '1', '1', '2'),
	('2023-05-01', 'Verizon', '212.92', 'true', '1', '1', '2'),
	('2023-05-01', 'Headspace', '13,77', 'true', '1', '1', '2'),
	('2023-05-01', 'Google', '2.11', 'true', '1', '1', '2'),
	('2023-05-01', 'Clickup', '0.73', 'true', '1', '1', '2'),
	('2023-05-01', 'Clickup', '14.17', 'true', '1', '1', '2'),
	('2023-05-01', 'Clickup', '18.13', 'true', '1', '1', '2');


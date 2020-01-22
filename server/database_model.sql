-- Creator:       MySQL Workbench 8.0.19/ExportSQLite Plugin 0.1.0
-- Author:        Ben
-- Caption:       New Model
-- Project:       Name of the project
-- Changed:       2020-01-21 14:59
-- Created:       2020-01-19 20:55
PRAGMA foreign_keys = OFF;

-- Schema: database
ATTACH "database.db" AS "database";
BEGIN;
CREATE TABLE "database"."user"(
  "user_id" INTEGER PRIMARY KEY NOT NULL,
  "user_type" VARCHAR(45),
  CONSTRAINT "user_id_UNIQUE"
    UNIQUE("user_id")
);
CREATE TABLE "database"."context"(
  "context_id" INTEGER PRIMARY KEY NOT NULL,
  "content" VARCHAR(250),
  CONSTRAINT "context_id_UNIQUE"
    UNIQUE("context_id")
);
CREATE TABLE "database"."visit"(
  "visit_id" INTEGER PRIMARY KEY NOT NULL,
  "user_id" INTEGER NOT NULL,
  "ip" VARCHAR(15),
  "connection_time" DATETIME,
  CONSTRAINT "visit_id_UNIQUE"
    UNIQUE("visit_id"),
  CONSTRAINT "user_id"
    FOREIGN KEY("user_id")
    REFERENCES "user"("user_id")
);
CREATE INDEX "database"."visit.user_id_idx" ON "visit" ("user_id");
CREATE TABLE "database"."label"(
  "label_id" INTEGER PRIMARY KEY NOT NULL,
  "context_id" INTEGER NOT NULL,
  "user_id" INTEGER NOT NULL,
  "visit_id" INTEGER NOT NULL,
  "label_time" FLOAT,
  "label" label NOT NULL,
  CONSTRAINT "label_id_UNIQUE"
    UNIQUE("label_id"),
  CONSTRAINT "context_id"
    FOREIGN KEY("context_id")
    REFERENCES "context"("context_id"),
  CONSTRAINT "user_id"
    FOREIGN KEY("user_id")
    REFERENCES "user"("user_id"),
  CONSTRAINT "visit_id"
    FOREIGN KEY("visit_id")
    REFERENCES "visit"("visit_id")
);
CREATE INDEX "database"."label.context_id_idx" ON "label" ("context_id");
CREATE INDEX "database"."label.user_id_idx" ON "label" ("user_id");
CREATE INDEX "database"."label.visit_id_idx" ON "label" ("visit_id");
COMMIT;

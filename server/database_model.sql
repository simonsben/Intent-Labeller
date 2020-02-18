-- Creator:       MySQL Workbench 8.0.19/ExportSQLite Plugin 0.1.0
-- Author:        Ben
-- Caption:       New Model
-- Project:       Name of the project
-- Changed:       2020-02-18 16:21
-- Created:       2020-01-19 20:55
PRAGMA foreign_keys = OFF;

-- Schema: labelling_database
ATTACH "labelling_database.sdb" AS "labelling_database";
BEGIN;
CREATE TABLE "labelling_database"."user"(
  "user_id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "user_type" VARCHAR(45),
  CONSTRAINT "user_id_UNIQUE"
    UNIQUE("user_id")
);
CREATE TABLE "labelling_database"."context"(
  "context_id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "document_id" INTEGER NOT NULL,
  "context_index" INTEGER NOT NULL,
  "content" VARCHAR(3000) NOT NULL,
  CONSTRAINT "context_id_UNIQUE"
    UNIQUE("context_id")
);
CREATE TABLE "labelling_database"."visit"(
  "visit_id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "user_id" INTEGER NOT NULL,
  "ip" VARCHAR(15),
  "connection_time" DATETIME,
  CONSTRAINT "visit_id_UNIQUE"
    UNIQUE("visit_id"),
  CONSTRAINT "user_id"
    FOREIGN KEY("user_id")
    REFERENCES "user"("user_id")
);
CREATE INDEX "labelling_database"."visit.user_id_idx" ON "visit" ("user_id");
CREATE TABLE "labelling_database"."label"(
  "label_id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
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
CREATE INDEX "labelling_database"."label.context_id_idx" ON "label" ("context_id");
CREATE INDEX "labelling_database"."label.user_id_idx" ON "label" ("user_id");
CREATE INDEX "labelling_database"."label.visit_id_idx" ON "label" ("visit_id");
COMMIT;

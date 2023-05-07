CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "price" float NOT NULL,
  "weight" float NOT NULL,
  "quantity" integer DEFAULT 0,
  "ean" char(13), -- 13 chars barcode
  "category_id" integer NOT NULL
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "brand_id" integer NOT NULL,
  "animal_id" integer NOT NULL,
  "name" text NOT NULL
);

CREATE TABLE "brands" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL
);

CREATE TABLE "animals" (
  "id" SERIAL PRIMARY KEY,
  "type" text NOT NULL
);

ALTER TABLE "products" ADD CONSTRAINT "fk_category" FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "categories" ADD CONSTRAINT "fk_brand" FOREIGN KEY ("brand_id") REFERENCES "brands" ("id");

ALTER TABLE "categories" ADD CONSTRAINT "fk_animal" FOREIGN KEY ("animal_id") REFERENCES "animals" ("id");

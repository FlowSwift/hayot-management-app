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


-- Random content for testing

-- Animals

INSERT INTO animals(type) VALUES('Dog');
INSERT INTO animals(type) VALUES('Cat');


-- Brands

INSERT INTO brands(name) VALUES('Doggylicious');
INSERT INTO brands(name) VALUES('El Chihuahi');
INSERT INTO brands(name) VALUES('Huskey La Vista');
INSERT INTO brands(name) VALUES('Kibble Nibble');


-- Categories, 3 for each brand (brands will usually not share the same categories names like in this test sample)

-- Doggylicious
INSERT INTO categories(brand_id, animal_id, name) VALUES((SELECT id FROM brands WHERE name = 'Doggylicious'), (SELECT id FROM animals WHERE type = 'Dog'), 'Classy');
INSERT INTO categories(brand_id, animal_id, name) VALUES((SELECT id FROM brands WHERE name = 'Doggylicious'), (SELECT id FROM animals WHERE type = 'Dog'), 'Dietetic Food');
INSERT INTO categories(brand_id, animal_id, name) VALUES((SELECT id FROM brands WHERE name = 'Doggylicious'), (SELECT id FROM animals WHERE type = 'Dog'), 'Medical');
-- El Chihuahi
INSERT INTO categories(brand_id, animal_id, name) VALUES((SELECT id FROM brands WHERE name = 'El Chihuahi'), (SELECT id FROM animals WHERE type = 'Dog'), 'Classy');
INSERT INTO categories(brand_id, animal_id, name) VALUES((SELECT id FROM brands WHERE name = 'El Chihuahi'), (SELECT id FROM animals WHERE type = 'Dog'), 'Dietetic Food');
INSERT INTO categories(brand_id, animal_id, name) VALUES((SELECT id FROM brands WHERE name = 'El Chihuahi'), (SELECT id FROM animals WHERE type = 'Dog'), 'Medical');
-- Huskey La Vista
INSERT INTO categories(brand_id, animal_id, name) VALUES((SELECT id FROM brands WHERE name = 'Huskey La Vista'), (SELECT id FROM animals WHERE type = 'Dog'), 'Classy');
INSERT INTO categories(brand_id, animal_id, name) VALUES((SELECT id FROM brands WHERE name = 'Huskey La Vista'), (SELECT id FROM animals WHERE type = 'Dog'), 'Dietetic Food');
INSERT INTO categories(brand_id, animal_id, name) VALUES((SELECT id FROM brands WHERE name = 'Huskey La Vista'), (SELECT id FROM animals WHERE type = 'Dog'), 'Medical');
-- Kibble Nibble
INSERT INTO categories(brand_id, animal_id, name) VALUES((SELECT id FROM brands WHERE name = 'Kibble Nibble'), (SELECT id FROM animals WHERE type = 'Dog'), 'Classy');
INSERT INTO categories(brand_id, animal_id, name) VALUES((SELECT id FROM brands WHERE name = 'Kibble Nibble'), (SELECT id FROM animals WHERE type = 'Dog'), 'Dietetic Food');
INSERT INTO categories(brand_id, animal_id, name) VALUES((SELECT id FROM brands WHERE name = 'Kibble Nibble'), (SELECT id FROM animals WHERE type = 'Dog'), 'Medical');


-- Products, 3 products for each category

-- Doggylicious
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Puppy', 99, 4, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Doggylicious' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Classy'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Adult', 119, 8, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Doggylicious' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Classy'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Senior', 139, 12, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Doggylicious' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Classy'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Puppy', 99, 4, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Doggylicious' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Dietetic Food'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Adult', 119, 8, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Doggylicious' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Dietetic Food'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Senior', 139, 12, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Doggylicious' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Dietetic Food'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Puppy', 99, 4, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Doggylicious' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Medical'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Adult', 119, 8, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Doggylicious' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Medical'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Senior', 139, 12, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Doggylicious' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Medical'));
-- El Chihuahi
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Puppy', 99, 4, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'El Chihuahi' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Classy'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Adult', 119, 8, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'El Chihuahi' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Classy'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Senior', 139, 12, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'El Chihuahi' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Classy'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Puppy', 99, 4, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'El Chihuahi' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Dietetic Food'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Adult', 119, 8, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'El Chihuahi' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Dietetic Food'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Senior', 139, 12, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'El Chihuahi' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Dietetic Food'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Puppy', 99, 4, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'El Chihuahi' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Medical'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Adult', 119, 8, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'El Chihuahi' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Medical'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Senior', 139, 12, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'El Chihuahi' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Medical'));
-- Huskey La Vista
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Puppy', 99, 4, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Huskey La Vista' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Classy'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Adult', 119, 8, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Huskey La Vista' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Classy'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Senior', 139, 12, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Huskey La Vista' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Classy'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Puppy', 99, 4, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Huskey La Vista' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Dietetic Food'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Adult', 119, 8, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Huskey La Vista' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Dietetic Food'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Senior', 139, 12, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Huskey La Vista' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Dietetic Food'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Puppy', 99, 4, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Huskey La Vista' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Medical'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Adult', 119, 8, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Huskey La Vista' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Medical'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Senior', 139, 12, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Huskey La Vista' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Medical'));
-- Kibble Nibble
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Puppy', 99, 4, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Kibble Nibble' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Classy'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Adult', 119, 8, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Kibble Nibble' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Classy'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Senior', 139, 12, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Kibble Nibble' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Classy'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Puppy', 99, 4, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Kibble Nibble' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Dietetic Food'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Adult', 119, 8, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Kibble Nibble' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Dietetic Food'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Senior', 139, 12, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Kibble Nibble' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Dietetic Food'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Puppy', 99, 4, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Kibble Nibble' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Medical'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Adult', 119, 8, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Kibble Nibble' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Medical'));
INSERT INTO products(name, price, weight, ean, category_id) VALUES('Senior', 139, 12, '1234567891234', (SELECT id FROM categories WHERE brand_id = (SELECT id FROM brands WHERE name = 'Kibble Nibble' ) AND animal_id = (SELECT id FROM animals WHERE type = 'Dog') AND name = 'Medical'));
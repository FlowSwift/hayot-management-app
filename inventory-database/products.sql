CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(24) NOT NULL UNIQUE,
  "password" VARCHAR(512) NOT NULL
);

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "price" float NOT NULL,
  "weight" float NOT NULL,
  "quantity" integer DEFAULT 0 NOT NULL,
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

CREATE TABLE "logs" (
    "id" SERIAL PRIMARY KEY,
    "user_id" integer NOT NULL,
    "product_id" integer NOT NULL,
    "action_type" text NOT NULL,
    "old_value" text,
    "new_value" text,
    "log_time" timestamp DEFAULT current_timestamp(5)
);



ALTER TABLE "products" ADD CONSTRAINT "fk_category" FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "categories" ADD CONSTRAINT "fk_brand" FOREIGN KEY ("brand_id") REFERENCES "brands" ("id");

ALTER TABLE "categories" ADD CONSTRAINT "fk_animal" FOREIGN KEY ("animal_id") REFERENCES "animals" ("id");

ALTER TABLE "logs" ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "logs" ADD CONSTRAINT "fk_product" FOREIGN KEY ("product_id") REFERENCES "products" ("id");


-- Random content for testing
INSERT INTO "animals" ("type") VALUES
('כלב'),
('חתול');

INSERT INTO "brands" ("name") VALUES
('Doggylicious'),
('El Chihuahi'),
('Huskey La Vista'),
('Kibble Nibble');

INSERT INTO "categories" ("brand_id", "animal_id", "name") VALUES
(1, 1, 'Puppy Food'),
(1, 1, 'Adult Dog Food'),
(1, 1, 'Senior Dog Food'),
(1, 1, 'Small Breed Dog Food'),
(1, 1, 'Grain-Free Dog Food'),
(2, 2, 'Kitten Food'),
(2, 2, 'Adult Cat Food'),
(2, 2, 'Senior Cat Food'),
(2, 2, 'Indoor Cat Food'),
(2, 2, 'Grain-Free Cat Food'),
(3, 1, 'Large Breed Dog Food'),
(3, 1, 'Sensitive Stomach Dog Food'),
(3, 1, 'Weight Management Dog Food'),
(3, 2, 'Outdoor Cat Food'),
(3, 2, 'Hairball Control Cat Food'),
(4, 1, 'Puppy Treats'),
(4, 1, 'Dog Dental Chews'),
(4, 1, 'Dog Training Treats'),
(4, 1, 'Dog Bones'),
(4, 1, 'Dog Jerky'),
(4, 2, 'Cat Treats'),
(4, 2, 'Catnip Toys'),
(4, 2, 'Interactive Cat Toys'),
(4, 2, 'Cat Scratching Posts'),
(4, 2, 'Cat Beds');

INSERT INTO "products" ("name", "price", "weight", "quantity", "ean", "category_id") VALUES
-- Doggylicious Products
('Doggylicious Puppy Chow', 29.99, 10.0, 100, '1234567890123', 1),
('Doggylicious Adult Blend', 24.99, 12.0, 75, '2345678901234', 2),
('Doggylicious Senior Blend', 26.99, 11.0, 50, '3456789012345', 3),
('Doggylicious Small Breed Formula', 27.99, 8.0, 50, '4567890123456', 4),
('Doggylicious Grain-Free Delight', 31.99, 11.5, 50, '5678901234567', 5),
('Doggylicious Large Breed Formula', 34.99, 15.0, 50, '6789012345678', 11),
('Doggylicious Sensitive Stomach Blend', 28.99, 10.5, 50, '7890123456789', 12),
('Doggylicious Weight Management Formula', 29.99, 10.0, 50, '8901234567890', 13),
('Doggylicious Lamb and Rice Recipe', 27.99, 12.0, 50, '9012345678901', 2),
('Doggylicious Salmon and Sweet Potato Formula', 31.99, 10.5, 50, '0123456789012', 4),
('Doggylicious Chicken and Brown Rice Blend', 26.99, 11.0, 50, '1234567890123', 3),
('Doggylicious Duck and Pea Recipe', 28.99, 11.5, 50, '2345678901234', 5),
('Doggylicious Turkey and Pumpkin Formula', 29.99, 10.0, 50, '3456789012345', 1),
('Doggylicious Beef and Barley Blend', 25.99, 12.0, 50, '4567890123456', 2),
('Doggylicious Bison and Sweet Potato Delight', 32.99, 10.5, 50, '5678901234567', 4),
('Doggylicious Chicken and Rice Formula', 27.99, 8.0, 50, '6789012345678', 3),
('Doggylicious Salmon and Lentil Recipe', 31.99, 11.5, 50, '7890123456789', 5),
('Doggylicious Lamb and Millet Blend', 34.99, 15.0, 50, '8901234567890', 1),
('Doggylicious Grain-Free Bison Formula', 28.99, 10.5, 50, '9012345678901', 6),
('Doggylicious Grain-Free Chicken Formula', 29.99, 10.0, 50, '0123456789012', 6),
('Doggylicious Grain-Free Salmon Formula', 25.99, 12.0, 50, '1234567890123', 6),
('Doggylicious Grain-Free Turkey Formula', 26.99, 11.0, 50, '2345678901234', 6),

-- El Chihuahi Products
('El Chihuahi Kitten Delight', 19.99, 3.0, 100, '3456789012345', 6),
('El Chihuahi Adult Blend', 22.99, 5.0, 75, '4567890123456', 7),
('El Chihuahi Senior Blend', 24.99, 4.5, 50, '5678901234567', 8),
('El Chihuahi Indoor Formula', 21.99, 6.0, 50, '6789012345678', 9),
('El Chihuahi Grain-Free Feast', 25.99, 5.5, 50, '7890123456789', 10),
('El Chihuahi Chicken and Rice Blend', 23.99, 7.0, 50, '8901234567890', 7),
('El Chihuahi Salmon and Sweet Potato Formula', 27.99, 5.5, 50, '9012345678901', 9),
('El Chihuahi Tuna and Pea Recipe', 22.99, 6.5, 50, '0123456789012', 8),
('El Chihuahi Beef and Barley Blend', 24.99, 4.0, 50, '1234567890123', 7),
('El Chihuahi Duck and Lentil Delight', 21.99, 7.5, 50, '2345678901234', 10),
('El Chihuahi Chicken and Rice Formula', 25.99, 5.0, 50, '3456789012345', 7),
('El Chihuahi Salmon and Potato Blend', 23.99, 6.5, 50, '4567890123456', 9),
('El Chihuahi Tuna and Pea Formula', 27.99, 4.5, 50, '5678901234567', 8),
('El Chihuahi Beef and Lentil Recipe', 22.99, 7.0, 50, '6789012345678', 10),
('El Chihuahi Grain-Free Chicken Formula', 26.99, 5.5, 50, '7890123456789', 6),
('El Chihuahi Grain-Free Salmon Formula', 29.99, 5.0, 50, '8901234567890', 6),
('El Chihuahi Grain-Free Tuna Formula', 24.99, 4.5, 50, '9012345678901', 6),

-- Huskey La Vista Products
('Huskey La Vista Puppy Blend', 27.99, 10.0, 100, '0123456789012', 1),
('Huskey La Vista Adult Formula', 25.99, 12.0, 75, '1234567890123', 2),
('Huskey La Vista Senior Formula', 26.99, 11.0, 50, '2345678901234', 3),
('Huskey La Vista Large Breed Blend', 29.99, 15.0, 50, '3456789012345', 4),
('Huskey La Vista Grain-Free Feast', 32.99, 11.5, 50, '4567890123456', 5),
('Huskey La Vista Sensitive Stomach Formula', 27.99, 10.5, 50, '5678901234567', 12),
('Huskey La Vista Weight Management Blend', 28.99, 10.0, 50, '6789012345678', 13),
('Huskey La Vista Chicken and Rice Blend', 24.99, 13.0, 50, '7890123456789', 2),
('Huskey La Vista Salmon and Sweet Potato Formula', 27.99, 10.5, 50, '8901234567890', 4),
('Huskey La Vista Lamb and Brown Rice Recipe', 26.99, 11.0, 50, '9012345678901', 3),
('Huskey La Vista Duck and Pea Delight', 28.99, 11.5, 50, '0123456789012', 5),
('Huskey La Vista Turkey and Pumpkin Formula', 29.99, 10.0, 50, '1234567890123', 1),
('Huskey La Vista Beef and Barley Blend', 25.99, 12.0, 50, '2345678901234', 2),
('Huskey La Vista Bison and Sweet Potato Delight', 32.99, 10.5, 50, '3456789012345', 4),
('Huskey La Vista Chicken and Rice Formula', 27.99, 8.0, 50, '4567890123456', 3),
('Huskey La Vista Salmon and Lentil Recipe', 31.99, 11.5, 50, '5678901234567', 5),
('Huskey La Vista Lamb and Millet Blend', 34.99, 15.0, 50, '6789012345678', 1),
('Huskey La Vista Grain-Free Bison Formula', 28.99, 10.5, 50, '7890123456789', 6),
('Huskey La Vista Grain-Free Chicken Formula', 29.99, 10.0, 50, '8901234567890', 6),
('Huskey La Vista Grain-Free Salmon Formula', 25.99, 12.0, 50, '9012345678901', 6),
('Huskey La Vista Grain-Free Turkey Formula', 26.99, 11.0, 50, '0123456789012', 6),

-- Kibble Nibble Products
('Kibble Nibble Kitten Feast', 20.99, 3.0, 100, '1234567890123', 6),
('Kibble Nibble Adult Delight', 23.99, 5.0, 75, '2345678901234', 7),
('Kibble Nibble Senior Delight', 25.99, 4.5, 50, '3456789012345', 8),
('Kibble Nibble Indoor Formula', 22.99, 6.0, 50, '4567890123456', 9),
('Kibble Nibble Grain-Free Feast', 27.99, 5.5, 50, '5678901234567', 10),
('Kibble Nibble Chicken and Rice Blend', 24.99, 13.0, 50, '6789012345678', 7),
('Kibble Nibble Salmon and Sweet Potato Formula', 27.99, 10.5, 50, '7890123456789', 9),
('Kibble Nibble Tuna and Pea Recipe', 22.99, 6.5, 50, '8901234567890', 8),
('Kibble Nibble Beef and Barley Blend', 24.99, 4.0, 50, '9012345678901', 7),
('Kibble Nibble Duck and Lentil Delight', 21.99, 7.5, 50, '0123456789012', 10),
('Kibble Nibble Chicken and Rice Formula', 25.99, 5.0, 50, '1234567890123', 7),
('Kibble Nibble Salmon and Potato Blend', 23.99, 6.5, 50, '2345678901234', 9),
('Kibble Nibble Tuna and Pea Formula', 27.99, 4.5, 50, '3456789012345', 8),
('Kibble Nibble Beef and Lentil Recipe', 22.99, 7.0, 50, '4567890123456', 10),
('Kibble Nibble Grain-Free Chicken Formula', 26.99, 5.5, 50, '5678901234567', 6),
('Kibble Nibble Grain-Free Salmon Formula', 29.99, 5.0, 50, '6789012345678', 6),
('Kibble Nibble Grain-Free Tuna Formula', 24.99, 4.5, 50, '7890123456789', 6);
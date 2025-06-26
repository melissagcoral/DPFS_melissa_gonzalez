-- PASO 1: Modificar tabla products para agregar campos de imagen
ALTER TABLE products 
ADD COLUMN image_url VARCHAR(500),
ADD COLUMN image_alt VARCHAR(255),
ADD COLUMN thumbnail_url VARCHAR(500);

-- PASO 2: Actualizar productos existentes con rutas de imágenes locales
UPDATE products SET 
    image_url = CASE id
        WHEN 1 THEN '/images/products/gel-limpiador-suave.jpg'
        WHEN 2 THEN '/images/products/crema-hidratante-24h.jpg'
        WHEN 3 THEN '/images/products/serum-vitamina-c.jpg'
        WHEN 4 THEN '/images/products/protector-solar-spf50.jpg'
        WHEN 5 THEN '/images/products/exfoliante-facial.jpg'
        WHEN 6 THEN '/images/products/mascarilla-purificante.jpg'
        WHEN 7 THEN '/images/products/tonico-equilibrante.jpg'
        WHEN 8 THEN '/images/products/crema-contorno-ojos.jpg'
        WHEN 9 THEN '/images/products/serum-anti-edad.jpg'
        WHEN 10 THEN '/images/products/gel-anti-acne.jpg'
    END,
    image_alt = CASE id
        WHEN 1 THEN 'Gel Limpiador Suave para rostro - Skincare'
        WHEN 2 THEN 'Crema Hidratante 24 horas - Cuidado facial'
        WHEN 3 THEN 'Serum con Vitamina C antioxidante - Anti-edad'
        WHEN 4 THEN 'Protector Solar SPF 50 - Protección facial'
        WHEN 5 THEN 'Exfoliante Facial suave - Renovación celular'
        WHEN 6 THEN 'Mascarilla Purificante de arcilla - Piel grasa'
        WHEN 7 THEN 'Tónico Equilibrante sin alcohol - Todo tipo de piel'
        WHEN 8 THEN 'Crema para Contorno de Ojos - Anti-ojeras'
        WHEN 9 THEN 'Serum Anti-edad con retinol - Líneas de expresión'
        WHEN 10 THEN 'Gel Anti-acné para tratamiento - Piel propensa'
    END,
    thumbnail_url = CASE id
        WHEN 1 THEN '/images/products/thumbnails/gel-limpiador-suave-thumb.jpg'
        WHEN 2 THEN '/images/products/thumbnails/crema-hidratante-24h-thumb.jpg'
        WHEN 3 THEN '/images/products/thumbnails/serum-vitamina-c-thumb.jpg'
        WHEN 4 THEN '/images/products/thumbnails/protector-solar-spf50-thumb.jpg'
        WHEN 5 THEN '/images/products/thumbnails/exfoliante-facial-thumb.jpg'
        WHEN 6 THEN '/images/products/thumbnails/mascarilla-purificante-thumb.jpg'
        WHEN 7 THEN '/images/products/thumbnails/tonico-equilibrante-thumb.jpg'
        WHEN 8 THEN '/images/products/thumbnails/crema-contorno-ojos-thumb.jpg'
        WHEN 9 THEN '/images/products/thumbnails/serum-anti-edad-thumb.jpg'
        WHEN 10 THEN '/images/products/thumbnails/gel-anti-acne-thumb.jpg'
    END;

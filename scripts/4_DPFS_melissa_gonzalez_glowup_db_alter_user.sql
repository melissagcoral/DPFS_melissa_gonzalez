-- Script para modificar la tabla users agregando el campo type
-- ================================================================

-- 1. Crear el tipo ENUM para PostgreSQL
CREATE TYPE user_type AS ENUM ('Usuario', 'Administrador');

-- 2. Agregar la columna type a la tabla users
ALTER TABLE users 
ADD COLUMN type user_type NOT NULL DEFAULT 'Usuario';

-- 3. Actualizar algunos registros como Admin y los demas como Usuario
UPDATE users SET type = 'Administrador' WHERE id IN (1, 4, 8);


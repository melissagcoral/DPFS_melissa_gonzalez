-- Script de INSERT para E-commerce de Skincare - PRECIOS EN GUARANÍES
-- Orden de inserción: users -> product_categories -> products -> carts -> cart_items -> orders -> order_items

-- 1. Insertar usuarios
INSERT INTO users (name, lastname, email, password, created_at, updated_at) VALUES
('María', 'González', 'maria.gonzalez@email.com', '$2b$10$hashedpassword1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Ana', 'López', 'ana.lopez@email.com', '$2b$10$hashedpassword2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Carmen', 'Martínez', 'carmen.martinez@email.com', '$2b$10$hashedpassword3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Laura', 'Rodríguez', 'laura.rodriguez@email.com', '$2b$10$hashedpassword4', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sofía', 'Fernández', 'sofia.fernandez@email.com', '$2b$10$hashedpassword5', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Isabel', 'García', 'isabel.garcia@email.com', '$2b$10$hashedpassword6', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Patricia', 'Ruiz', 'patricia.ruiz@email.com', '$2b$10$hashedpassword7', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Valentina', 'Díaz', 'valentina.diaz@email.com', '$2b$10$hashedpassword8', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Camila', 'Torres', 'camila.torres@email.com', '$2b$10$hashedpassword9', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Lucía', 'Morales', 'lucia.morales@email.com', '$2b$10$hashedpassword10', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 2. Insertar categorías de productos
INSERT INTO product_categories (name, description, created_at, updated_at) VALUES
('Limpiadores', 'Productos para limpiar y purificar la piel', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Hidratantes', 'Cremas y lociones hidratantes para todo tipo de piel', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Serums', 'Tratamientos concentrados para problemas específicos', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Protector Solar', 'Productos de protección solar para el cuidado diario', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Exfoliantes', 'Productos para remover células muertas y renovar la piel', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Mascarillas', 'Tratamientos intensivos para diferentes tipos de piel', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Tónicos', 'Productos para equilibrar y preparar la piel', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Contorno de Ojos', 'Tratamientos específicos para el área de los ojos', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Anti-edad', 'Productos especializados en prevenir signos de envejecimiento', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Acné', 'Tratamientos específicos para piel propensa al acné', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 3. Insertar productos (PRECIOS EN GUARANÍES)
INSERT INTO products (name, description, category, price, created_at, updated_at) VALUES
('Gel Limpiador Suave', 'Limpiador facial suave para uso diario', 1, 185000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Crema Hidratante 24H', 'Hidratación profunda por 24 horas', 2, 250000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Serum Vitamina C', 'Serum antioxidante con vitamina C pura', 3, 320000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Protector Solar SPF 50', 'Protección solar facial de amplio espectro', 4, 210000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Exfoliante Facial', 'Exfoliante suave con ácidos naturales', 5, 230000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Mascarilla Purificante', 'Mascarilla de arcilla para piel grasa', 6, 160000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Tónico Equilibrante', 'Tónico sin alcohol para todo tipo de piel', 7, 145000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Crema Contorno Ojos', 'Tratamiento anti-ojeras y anti-arrugas', 8, 300000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Serum Anti-edad', 'Serum con retinol para líneas de expresión', 9, 390000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Gel Anti-acné', 'Tratamiento específico para granos y espinillas', 10, 215000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 4. Insertar carritos (algunos activos, otros convertidos o abandonados)
INSERT INTO carts (user_id, status, subtotal, tax_amount, shipping_cost, total, created_at, updated_at) VALUES
(1, 'Activo', 580000, 58000, 35000, 673000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Activo', 320000, 32000, 35000, 387000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Convertido', 920000, 92000, 0, 1012000, CURRENT_TIMESTAMP - INTERVAL '2 days', CURRENT_TIMESTAMP - INTERVAL '2 days'),
(4, 'Activo', 185000, 18500, 35000, 238500, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Abandonado', 230000, 23000, 35000, 288000, CURRENT_TIMESTAMP - INTERVAL '5 days', CURRENT_TIMESTAMP - INTERVAL '5 days'),
(6, 'Activo', 620000, 62000, 35000, 717000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Convertido', 300000, 30000, 35000, 365000, CURRENT_TIMESTAMP - INTERVAL '1 day', CURRENT_TIMESTAMP - INTERVAL '1 day'),
(8, 'Activo', 145000, 14500, 35000, 194500, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'Activo', 535000, 53500, 35000, 623500, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 'Abandonado', 210000, 21000, 35000, 266000, CURRENT_TIMESTAMP - INTERVAL '3 days', CURRENT_TIMESTAMP - INTERVAL '3 days');

-- 5. Insertar items del carrito
INSERT INTO cart_items (cart_id, product_id, quantity, unit_price, subtotal, created_at, updated_at) VALUES
-- Carrito 1 (user 1): Gel Limpiador + Crema Hidratante + Tónico
(1, 1, 1, 185000, 185000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 2, 1, 250000, 250000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 7, 1, 145000, 145000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Carrito 2 (user 2): Serum Vitamina C
(2, 3, 1, 320000, 320000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Carrito 3 (user 3): Crema Hidratante + Serum Anti-edad + Protector Solar
(3, 2, 1, 250000, 250000, CURRENT_TIMESTAMP - INTERVAL '2 days', CURRENT_TIMESTAMP - INTERVAL '2 days'),
(3, 9, 1, 390000, 390000, CURRENT_TIMESTAMP - INTERVAL '2 days', CURRENT_TIMESTAMP - INTERVAL '2 days'),
(3, 4, 1, 210000, 210000, CURRENT_TIMESTAMP - INTERVAL '2 days', CURRENT_TIMESTAMP - INTERVAL '2 days'),

-- Carrito 4 (user 4): Gel Limpiador
(4, 1, 1, 185000, 185000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Carrito 5 (user 5): Exfoliante
(5, 5, 1, 230000, 230000, CURRENT_TIMESTAMP - INTERVAL '5 days', CURRENT_TIMESTAMP - INTERVAL '5 days'),

-- Carrito 6 (user 6): Serum Vitamina C + Crema Contorno Ojos
(6, 3, 1, 320000, 320000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 8, 1, 300000, 300000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Carrito 7 (user 7): Crema Contorno Ojos
(7, 8, 1, 300000, 300000, CURRENT_TIMESTAMP - INTERVAL '1 day', CURRENT_TIMESTAMP - INTERVAL '1 day'),

-- Carrito 8 (user 8): Tónico
(8, 7, 1, 145000, 145000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Carrito 9 (user 9): Serum Vitamina C + Gel Anti-acné
(9, 3, 1, 320000, 320000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 10, 1, 215000, 215000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Carrito 10 (user 10): Protector Solar
(10, 4, 1, 210000, 210000, CURRENT_TIMESTAMP - INTERVAL '3 days', CURRENT_TIMESTAMP - INTERVAL '3 days');

-- 6. Insertar órdenes (solo para carritos convertidos y algunas adicionales)
INSERT INTO orders (user_id, cart_id, order_number, subtotal, tax_amount, discount_amount, shipping_cost, total, status, order_date, updated_at, shipping_address, billing_address, payment_method, payment_status, notes) VALUES
(3, 3, 'ORD-2024-001', 850000, 85000, 0, 0, 935000, 'Entregado', CURRENT_TIMESTAMP - INTERVAL '2 days', CURRENT_TIMESTAMP - INTERVAL '1 day', 'Av. Principal 123, Asunción', 'Av. Principal 123, Asunción', 'Tarjeta de Crédito', 'Pagado', 'Entrega rápida solicitada'),
(7, 7, 'ORD-2024-002', 300000, 30000, 0, 35000, 365000, 'Enviado', CURRENT_TIMESTAMP - INTERVAL '1 day', CURRENT_TIMESTAMP, 'Calle Secundaria 456, Asunción', 'Calle Secundaria 456, Asunción', 'PayPal', 'Pagado', NULL),
(1, NULL, 'ORD-2024-003', 580000, 58000, 70000, 35000, 603000, 'Procesando', CURRENT_TIMESTAMP - INTERVAL '3 hours', CURRENT_TIMESTAMP, 'Barrio Norte 789, Asunción', 'Barrio Norte 789, Asunción', 'Transferencia', 'Pagado', 'Descuento por cliente frecuente'),
(2, NULL, 'ORD-2024-004', 465000, 46500, 0, 35000, 546500, 'Confirmado', CURRENT_TIMESTAMP - INTERVAL '1 hour', CURRENT_TIMESTAMP, 'Centro Histórico 321, Asunción', 'Centro Histórico 321, Asunción', 'Tarjeta de Débito', 'Pagado', NULL),
(5, NULL, 'ORD-2024-005', 940000, 94000, 105000, 0, 929000, 'Pendiente', CURRENT_TIMESTAMP - INTERVAL '30 minutes', CURRENT_TIMESTAMP, 'Villa Morra 654, Asunción', 'Villa Morra 654, Asunción', 'Efectivo', 'Pendiente', 'Pago contra entrega'),
(6, NULL, 'ORD-2024-006', 640000, 64000, 0, 35000, 739000, 'Cancelado', CURRENT_TIMESTAMP - INTERVAL '4 days', CURRENT_TIMESTAMP - INTERVAL '3 days', 'San Lorenzo 987, Asunción', 'San Lorenzo 987, Asunción', 'Tarjeta de Crédito', 'Reembolsado', 'Cancelación por cliente'),
(8, NULL, 'ORD-2024-007', 390000, 39000, 35000, 35000, 429000, 'Entregado', CURRENT_TIMESTAMP - INTERVAL '5 days', CURRENT_TIMESTAMP - INTERVAL '3 days', 'Lambaré 147, Asunción', 'Lambaré 147, Asunción', 'PayPal', 'Pagado', NULL),
(9, NULL, 'ORD-2024-008', 1430000, 143000, 0, 0, 1573000, 'Entregado', CURRENT_TIMESTAMP - INTERVAL '6 days', CURRENT_TIMESTAMP - INTERVAL '4 days', 'Ñemby 258, Asunción', 'Ñemby 258, Asunción', 'Tarjeta de Crédito', 'Pagado', 'Compra de rutina completa'),
(10, NULL, 'ORD-2024-009', 250000, 25000, 0, 35000, 310000, 'Procesando', CURRENT_TIMESTAMP - INTERVAL '2 hours', CURRENT_TIMESTAMP, 'Fernando de la Mora 369, Asunción', 'Fernando de la Mora 369, Asunción', 'Transferencia', 'Pagado', NULL),
(4, NULL, 'ORD-2024-010', 540000, 54000, 0, 35000, 629000, 'Confirmado', CURRENT_TIMESTAMP - INTERVAL '45 minutes', CURRENT_TIMESTAMP, 'Mariano Roque Alonso 741, Asunción', 'Mariano Roque Alonso 741, Asunción', 'Tarjeta de Débito', 'Pagado', NULL);

-- 7. Insertar items de las órdenes
INSERT INTO order_items (order_id, product_id, unit_price, quantity, subtotal) VALUES
-- Orden 1 (ORD-2024-001): Productos del carrito 3
(1, 2, 250000, 1, 250000),  -- Crema Hidratante
(1, 9, 390000, 1, 390000),  -- Serum Anti-edad  
(1, 4, 210000, 1, 210000),  -- Protector Solar

-- Orden 2 (ORD-2024-002): Productos del carrito 7
(2, 8, 300000, 1, 300000),  -- Crema Contorno Ojos

-- Orden 3 (ORD-2024-003): Orden independiente
(3, 1, 185000, 1, 185000),  -- Gel Limpiador
(3, 3, 320000, 1, 320000),  -- Serum Vitamina C
(3, 7, 145000, 1, 145000),  -- Tónico

-- Orden 4 (ORD-2024-004): Orden independiente  
(4, 2, 250000, 1, 250000),  -- Crema Hidratante
(4, 10, 215000, 1, 215000), -- Gel Anti-acné

-- Orden 5 (ORD-2024-005): Orden independiente
(5, 3, 320000, 2, 640000),  -- Serum Vitamina C x2
(5, 8, 300000, 1, 300000),  -- Crema Contorno Ojos

-- Orden 6 (ORD-2024-006): Orden cancelada
(6, 9, 390000, 1, 390000),  -- Serum Anti-edad
(6, 2, 250000, 1, 250000),  -- Crema Hidratante

-- Orden 7 (ORD-2024-007): Orden independiente
(7, 3, 320000, 1, 320000),  -- Serum Vitamina C
(7, 7, 145000, 1, 145000),  -- Tónico

-- Orden 8 (ORD-2024-008): Orden grande
(8, 1, 185000, 1, 185000),  -- Gel Limpiador
(8, 2, 250000, 1, 250000),  -- Crema Hidratante
(8, 3, 320000, 1, 320000),  -- Serum Vitamina C
(8, 4, 210000, 1, 210000),  -- Protector Solar
(8, 8, 300000, 1, 300000),  -- Crema Contorno Ojos
(8, 9, 390000, 1, 390000),  -- Serum Anti-edad

-- Orden 9 (ORD-2024-009): Orden independiente
(9, 2, 250000, 1, 250000),  -- Crema Hidratante

-- Orden 10 (ORD-2024-010): Orden independiente
(10, 1, 185000, 1, 185000), -- Gel Limpiador
(10, 4, 210000, 1, 210000), -- Protector Solar
(10, 7, 145000, 1, 145000); -- Tónico

-- Verificar los datos insertados
SELECT 'Usuarios insertados:' as tabla, COUNT(*) as total FROM users
UNION ALL
SELECT 'Categorías insertadas:', COUNT(*) FROM product_categories  
UNION ALL
SELECT 'Productos insertados:', COUNT(*) FROM products
UNION ALL
SELECT 'Carritos insertados:', COUNT(*) FROM carts
UNION ALL
SELECT 'Items en carritos:', COUNT(*) FROM cart_items
UNION ALL  
SELECT 'Órdenes insertadas:', COUNT(*) FROM orders
UNION ALL
SELECT 'Items en órdenes:', COUNT(*) FROM order_items;

-- Query adicional para verificar rangos de precios
SELECT 
    'Rango de precios productos:' as verificacion,
    CONCAT(MIN(price), ' - ', MAX(price), ' Gs') as rango
FROM products;
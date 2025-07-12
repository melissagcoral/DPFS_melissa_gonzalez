// test-db.js - Archivo temporal para probar la conexión
const db = require('./src/database/models');

async function testConnection() {
    try {
        // Probar conexión a la base de datos
        await db.sequelize.authenticate();
        console.log('✅ Conexión a la base de datos exitosa');
        
        // Verificar que el modelo User existe
        console.log('📋 Modelos disponibles:', Object.keys(db));
        
        // Probar una consulta simple
        const users = await db.User.findAll();
        console.log(`👥 Usuarios existentes: ${users.length}`);
        
        // Verificar estructura de la tabla
        const userAttributes = db.User.rawAttributes;
        console.log('🏗️  Atributos del modelo User:', Object.keys(userAttributes));
        
    } catch (error) {
        console.error('❌ Error de conexión:', error);
    } finally {
        // Cerrar la conexión
        await db.sequelize.close();
    }
}

testConnection();
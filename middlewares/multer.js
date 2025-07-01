const multer = require('multer');
const path = require('path');

// configuracion de almacenamiento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // carpeta donde se guardaran las imagenes
        cb(null, 'public/images/products/');
    },
    filename: function (req, file, cb) {
        // nombre del archivo: timestamp + nombre original
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// para validar tipos de archivo
const fileFilter = (req, file, cb) => {
    // Acepta solo imagenes
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten archivos de imagen'), false);
    }
};

// configuracion de multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // hasta 5MB
    },
    fileFilter: fileFilter
});

module.exports = upload;
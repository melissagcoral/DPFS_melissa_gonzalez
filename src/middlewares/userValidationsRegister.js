const { body } = require("express-validator");

const validations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre debe tener entre 3 y 20 caracteres")
    .bail()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El nombre solo puede contener letras y espacios"),
  body("lastname")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .bail()
    .isLength({ min: 3, max: 30 })
    .withMessage("El apellido debe tener entre 3 y 30 caracteres")
    .bail()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/)
    .withMessage("El apellido contiene caracteres no permitidos"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio")
    .bail()
    .isEmail()
    .withMessage("Por favor ingresa un correo electrónico válido")
    .bail()
    .normalizeEmail(),  
  body("password")
    .trim()
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .bail()
    .matches(/[A-Z]/)
    .withMessage("Debe contener al menos una letra mayúscula")
    .bail()
    .matches(/[a-z]/)
    .withMessage("Debe contener al menos una letra minúscula")
    .bail()
    .matches(/[0-9]/)
    .withMessage("Debe contener al menos un número")
    .bail()
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Debe contener al menos un símbolo especial"),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Debes confirmar tu contraseña")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Las contraseñas no coinciden");
      }
      return true;
    }),
];

module.exports = validations;

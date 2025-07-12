module.exports = function (sequelize, dataTypes) {
    let alias = 'Cart';
    
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.BIGINT
        },
        user_id: {
            type: dataTypes.BIGINT,
            allowNull: false
        },
        status: {
            type: dataTypes.STRING(20),
            defaultValue: 'Activo',
            validate: {
                isIn: [['Activo', 'Abandonado', 'Convertido']]
            }
        },
        subtotal: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        tax_amount: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        discount_amount: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        shipping_cost: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        total: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        created_at: {
            type: dataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: dataTypes.DATE,
            allowNull: true
        }
    };
    
    let config = {
        tableName: "carts",
        timestamps: true,
        underscored: true
    };
    
    const Cart = sequelize.define(alias, cols, config);
    
    Cart.associate = function(models) {
        Cart.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        });
        
        Cart.hasMany(models.CartItem, {
            as: 'cartItems',
            foreignKey: 'cart_id'
        });
        
        Cart.hasOne(models.Order, {
            as: 'order',
            foreignKey: 'cart_id'
        });
    };
    
    return Cart;
};

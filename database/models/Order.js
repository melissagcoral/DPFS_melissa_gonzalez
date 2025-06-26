module.exports = function (sequelize, dataTypes) {
    let alias = 'Order';
    
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
        cart_id: {
            type: dataTypes.BIGINT,
            allowNull: true
        },
        order_number: {
            type: dataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        subtotal: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00,
            validate: {
                min: 0
            }
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
            defaultValue: 0.00,
            validate: {
                min: 0
            }
        },
        status: {
            type: dataTypes.STRING(20),
            defaultValue: 'Pendiente',
            validate: {
                isIn: [['Pendiente', 'Confirmado', 'Procesando', 'Enviado', 'Entregado', 'Cancelado']]
            }
        },
        order_date: {
            type: dataTypes.DATE,
            defaultValue: dataTypes.NOW
        },
        updated_at: {
            type: dataTypes.DATE,
            allowNull: true
        },
        shipping_address: {
            type: dataTypes.TEXT,
            allowNull: true
        },
        billing_address: {
            type: dataTypes.TEXT,
            allowNull: true
        },
        payment_method: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        payment_status: {
            type: dataTypes.STRING(20),
            defaultValue: 'Pendiente',
            validate: {
                isIn: [['Pendiente', 'Pagado', 'Fallido', 'Reembolsado']]
            }
        },
        notes: {
            type: dataTypes.TEXT,
            allowNull: true
        }
    };
    
    let config = {
        tableName: "orders",
        timestamps: false, // Usamos order_date en lugar de created_at
        underscored: true
    };
    
    const Order = sequelize.define(alias, cols, config);
    
    Order.associate = function(models) {
        Order.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        });
        
        Order.belongsTo(models.Cart, {
            as: 'cart',
            foreignKey: 'cart_id'
        });
        
        Order.hasMany(models.OrderItem, {
            as: 'orderItems',
            foreignKey: 'order_id'
        });
    };
    
    return Order;
};
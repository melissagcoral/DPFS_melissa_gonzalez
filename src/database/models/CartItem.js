module.exports = function (sequelize, dataTypes) {
    let alias = 'CartItem';
    
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.BIGINT
        },
        cart_id: {
            type: dataTypes.BIGINT,
            allowNull: false
        },
        product_id: {
            type: dataTypes.BIGINT,
            allowNull: false
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 1
            }
        },
        unit_price: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0
            }
        },
        subtotal: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0
            }
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
        tableName: "cart_items",
        timestamps: true,
        underscored: true,
        indexes: [
            {
                unique: true,
                fields: ['cart_id', 'product_id']
            }
        ]
    };
    
    const CartItem = sequelize.define(alias, cols, config);
    
    CartItem.associate = function(models) {
        CartItem.belongsTo(models.Cart, {
            as: 'cart',
            foreignKey: 'cart_id'
        });
        
        CartItem.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id'
        });
    };
    
    return CartItem;
};
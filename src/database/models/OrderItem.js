module.exports = function (sequelize, dataTypes) {
    let alias = 'OrderItem';
    
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.BIGINT
        },
        order_id: {
            type: dataTypes.BIGINT,
            allowNull: false
        },
        product_id: {
            type: dataTypes.BIGINT,
            allowNull: false
        },
        unit_price: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0
            }
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        subtotal: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0
            }
        }
    };
    
    let config = {
        tableName: "order_items",
        timestamps: false, // Esta tabla no tiene timestamps
        underscored: true
    };
    
    const OrderItem = sequelize.define(alias, cols, config);
    
    OrderItem.associate = function(models) {
        OrderItem.belongsTo(models.Order, {
            as: 'order',
            foreignKey: 'order_id'
        });
        
        OrderItem.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id'
        });
    };
    
    return OrderItem;
};
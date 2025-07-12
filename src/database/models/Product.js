module.exports = function (sequelize, dataTypes) {
    let alias = 'Product';
    
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.BIGINT
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        category: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        image: {
            type: dataTypes.BLOB,
            allowNull: true
        },
        created_at: {
            type: dataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: dataTypes.DATE,
            allowNull: true
        },
        image_url: {
            type: dataTypes.STRING(500),
            allowNull: true
        },
        image_alt: {
            type: dataTypes.STRING(250),
            allowNull: true
        },
        thumbnail_url: {
            type: dataTypes.STRING(500),
            allowNull: true
        },
    };
    
    let config = {
        tableName: "products",
        timestamps: true,
        underscored: true
    };
    
    const Product = sequelize.define(alias, cols, config);
    
    Product.associate = function(models) {
        Product.belongsTo(models.ProductCategory, {
            as: 'productCategory',
            foreignKey: 'category'
        });
        
        Product.hasMany(models.CartItem, {
            as: 'cartItems',
            foreignKey: 'product_id'
        });
        
        Product.hasMany(models.OrderItem, {
            as: 'orderItems',
            foreignKey: 'product_id'
        });
    };
    
    return Product;
};
module.exports = function (sequelize, dataTypes) {
    let alias = 'ProductCategory';
    
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(100),
            allowNull: true
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
        tableName: "product_categories",
        timestamps: true,
        underscored: true
    };
    
    const ProductCategory = sequelize.define(alias, cols, config);
    
    ProductCategory.associate = function(models) {
        ProductCategory.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'category'
        });
    };
    
    return ProductCategory;
};

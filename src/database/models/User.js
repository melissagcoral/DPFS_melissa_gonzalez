module.exports = function (sequelize, dataTypes) {
    let alias = 'User';
    
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.BIGINT
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        lastname: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING(200),
            allowNull: true
        },
        avatar: {
            type: dataTypes.STRING(255),
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
        type: {
            type: dataTypes.STRING,
            allowNull: false,
            defaultValue: 'Usuario'
        }
    };
    
    let config = {
        tableName: "users",
        timestamps: true,
        underscored: true
    };
    
    const User = sequelize.define(alias, cols, config);
    
    User.associate = function(models) {
        User.hasMany(models.Cart, {
            as: 'carts',
            foreignKey: 'user_id'
        });
        
        User.hasMany(models.Order, {
            as: 'orders',
            foreignKey: 'user_id'
        });
    };
    
    return User;
};
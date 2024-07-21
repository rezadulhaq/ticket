"use strict";
const bcryptjs = require("bcryptjs");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            userName: DataTypes.STRING,
            email: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            password: DataTypes.STRING,
            isDeleted: DataTypes.BOOLEAN,
        },
        {
            hooks: {
                beforeCreate(instance, option) {
                    let salt = bcryptjs.genSaltSync(10);
                    let hash = bcryptjs.hashSync(instance.password, salt);

                    instance.password = hash;
                },
            },
            sequelize,
            modelName: "User",
        }
    );
    return User;
};

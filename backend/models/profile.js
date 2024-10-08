"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Profile extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Profile.init(
        {
            lineId: DataTypes.STRING,
            fullName: DataTypes.STRING,
            highSchool: DataTypes.STRING,
            UserId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "UserId is Required",
                    },
                    notEmpty: {
                        msg: "UserId is Required",
                    },
                },
            },
            isDeleted: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Profile",
        }
    );
    return Profile;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Task.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            taskName: DataTypes.STRING,
            done: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Task",
        }
    );
    return Task;
};

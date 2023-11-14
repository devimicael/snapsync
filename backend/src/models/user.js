import sequelize from "../../setup.js";
import {DataTypes } from "sequelize";
import Post from "./post.js";

const User = sequelize.define("Clients", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    }, 

    full_name: {
       type: DataTypes.STRING,
       allowNull: false 
    }, 

    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    }, 

    user_mail: {
        type: DataTypes.STRING,
        allowNull: false
    },

    user_phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },

    user_password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    user_gender: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_bio: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    },

    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    }
});

User.hasMany(Post, { foreignKey: 'post_userID' });
export default User;
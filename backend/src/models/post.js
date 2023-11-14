import sequelize from "../../setup.js";
import {DataTypes } from "sequelize";
import User from "./user.js";

const Post = sequelize.define("Posts", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    post_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    post_description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    post_imgURL: {
        type: DataTypes.STRING,
        allowNull: true
    },
    post_comments: {
        type: DataTypes.TEXT,
        defaultValue: '[]',
        allowNull: true
    },
    post_likes: {
        type: DataTypes.TEXT,
        defaultValue: '[]',
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    },

    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    },

    post_userID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Clients",
            key: "id"
        } 
    }
});

Post.belongsTo(User, {foreignKey: 'post_userID'});
export default Post;
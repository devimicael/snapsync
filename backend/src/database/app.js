import sequelize from "../../setup.js";
import User from "../models/user.js";
import Post from "../models/post.js";

async function syncDB(){
    try{
        await sequelize.sync();
        console.log("Tabelas criadas.");
    } catch(er){
        console.error(er);
    }
}

export default syncDB;
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
   dialect: 'sqlite',
   storage: 'backend/src/database/snapsync.db' 
});


export default sequelize;
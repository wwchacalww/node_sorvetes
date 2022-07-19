import { Sequelize } from "sequelize-typescript";
import UserModel from "../../../users/infra/repository/sequelize/user-model.sequelize";

let sequelize: Sequelize;
async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
    logging: false,
  });
  sequelize.addModels([UserModel]);
  await sequelize.sync();
}

export { setupDb };

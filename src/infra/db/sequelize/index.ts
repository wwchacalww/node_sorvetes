import { Sequelize } from "sequelize-typescript";
import UserModel from "../../../users/infra/repository/sequelize/user-model.sequelize";

let sequelize: Sequelize;
async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  sequelize.addModels([UserModel]);
  await sequelize.sync();
}

export { setupDb };

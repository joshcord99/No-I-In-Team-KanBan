import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

console.log("DB_URL exists:", !!process.env.DB_URL);
console.log("DB_URL length:", process.env.DB_URL?.length || 0);
console.log("DB_URL starts with:", process.env.DB_URL?.substring(0, 20) + "...");
import { UserFactory } from "./user.js";
import { TicketFactory } from "./ticket.js";

let sequelize: Sequelize;

if (process.env.DB_URL) {
  try {
    sequelize = new Sequelize(process.env.DB_URL, {
      dialectOptions: {
        decimalNumbers: true,
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: false,
    });
  } catch (error) {
    console.error("Error creating Sequelize instance with URL:", error);
    throw error;
  }
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || "",
    process.env.DB_USER || "",
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "postgres",
      dialectOptions: {
        decimalNumbers: true,
      },
    }
  );
}

const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);

User.hasMany(Ticket, { foreignKey: "assignedUserId" });
Ticket.belongsTo(User, { foreignKey: "assignedUserId", as: "assignedUser" });

export { sequelize, User, Ticket };

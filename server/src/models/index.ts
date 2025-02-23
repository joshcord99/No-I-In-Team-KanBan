import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";
import { UserFactory } from "./user.js";
import { TicketFactory } from "./ticket.js";

console.log("DB_URL exists:", !!process.env.DB_URL);
console.log("DB_URL length:", process.env.DB_URL?.length || 0);

let sequelize: Sequelize;

if (process.env.DB_URL) {
  try {
    // Extract the actual URL from the psql command
    let dbUrl = process.env.DB_URL;
    if (dbUrl.startsWith("psql '") && dbUrl.endsWith("'")) {
      dbUrl = dbUrl.substring(6, dbUrl.length - 1); // Remove "psql '" and "'"
    }
    
    console.log("Cleaned DB_URL:", dbUrl);
    
    // Parse the URL manually to avoid Sequelize parsing issues
    const url = new URL(dbUrl);
    const username = url.username;
    const password = url.password;
    const host = url.hostname;
    const port = url.port || "5432";
    const database = url.pathname.substring(1); // Remove leading slash
    
    console.log("Parsed database config:", { host, port, database, username });
    
    sequelize = new Sequelize(database, username, password, {
      host: host,
      port: parseInt(port),
      dialect: "postgres",
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
    console.error("Error creating Sequelize instance:", error);
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

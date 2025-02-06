import { seedUsers } from "./user-seeds.js";
import { seedTickets } from "./ticket-seeds.js";
import { sequelize } from "../models/index.js";

const seedAll = async (): Promise<void> => {
  try {
    console.log("Attempting to connect to database...");
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");

    await seedUsers();
    console.log("\n----- USERS SEEDED -----\n");

    await seedTickets();
    console.log("\n----- TICKETS SEEDED -----\n");

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    console.error("Please check your database connection settings.");
    console.error("DB_URL:", process.env.DB_URL ? "Set" : "Not set");
    process.exit(1);
  }
};

seedAll();

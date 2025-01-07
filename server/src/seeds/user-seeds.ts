import { User } from "../models/user.js";
import bcrypt from "bcrypt";

export const seedUsers = async () => {
  const users = [
    { username: "JollyGuru", password: "password" },
    { username: "SunnyScribe", password: "password" },
    { username: "RadiantComet", password: "password" },
  ];

  const hashedUsers = await Promise.all(
    users.map(async (userData) => ({
      username: userData.username,
      password: await bcrypt.hash(userData.password, 10),
    }))
  );

  await User.bulkCreate(hashedUsers, { individualHooks: false });
};

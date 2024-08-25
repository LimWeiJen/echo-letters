"use server"

import { connectToDatabase } from "../database/mongoose";
import User from "../database/models/user.model";
import { handleError } from "../utils";

// UPDATE
export async function updateSettings(userId: string, settings: SettingsParams) {
  try {
    await connectToDatabase();

    const user = (await User.find({ id: userId }))[0];

    if (!user) throw new Error("User not found");

    await User.findOneAndUpdate({ id: userId }, { $set: { settings: settings } });
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getSettings(userId: string) {
  try {
    await connectToDatabase();

    const user = (await User.find({ id: userId }))[0];

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user.settings));
  } catch (error) {
    handleError(error);
  }
}

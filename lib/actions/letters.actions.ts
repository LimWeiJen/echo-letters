"use server"

import { v4 } from "uuid";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { differenceInDays, handleError } from "../utils";
import { revalidatePath } from "next/cache";

export async function createEmptyLetter(userId: string, path: string) {
  try {
    await connectToDatabase();

    const user = (await User.find({ id: userId }))[0];

    if (!user) throw new Error("User not found");

    const newLetters = user.letters as Map<string, LetterParams>;
    const newLetterId = v4()
    newLetters.set(newLetterId, {
      dateOfCreation: new Date(),
      id: newLetterId,
      day: differenceInDays(new Date(), user.dateOfCreation),
      content: "",
      opened: true
    });

    await User.findOneAndUpdate({ id: userId }, { $set: { letters: newLetters } });

    revalidatePath(path);

    return new Response("", { status: 200 });

  } catch (error) {
    handleError(error);

    return new Response("Error Occured", { status: 500 });
  }
}


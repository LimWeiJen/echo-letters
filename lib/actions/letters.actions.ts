"use server"

import { v4 } from "uuid";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { differenceInDays, generateReturnedLetter, handleError } from "../utils";

// CREATE
export async function createEmptyLetter(userId: string) {
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
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateLetter(userId: string, letterId: string, letter: LetterParams) {
  try {
    await connectToDatabase();

    const user = (await User.find({ id: userId }))[0];

    if (!user) throw new Error("User not found");

    const newLetters = user.letters as Map<string, LetterParams>;
    const newReturnedLetters = user.returnedLetters as Map<string, LetterParams>;
    newLetters.set(letterId, letter);
    newReturnedLetters.set(letterId, await generateReturnedLetter(letter));

    await User.findOneAndUpdate({ id: userId }, { $set: { letters: newLetters, returnedLetters: newReturnedLetters } });
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getLetter(userId: string, letterId: string) {
  try {
    await connectToDatabase();

    const user = (await User.find({ id: userId }))[0];

    if (!user) throw new Error("User not found");

    const userLetter = (user.letters as Map<string, LetterParams>).get(letterId);
    const returnedLetter = (user.returnedLetters as Map<string, LetterParams>).get(letterId);

    return JSON.parse(JSON.stringify({ userLetter, returnedLetter }));
  } catch (error) {
    handleError(error);
  }
}

// READ ALL
export async function getAllLetters(userId: string) {
  try {
    await connectToDatabase();

    const user = (await User.find({ id: userId }))[0];

    if (!user) throw new Error("User not found");

    const userLetters = user.letters as Map<string, LetterParams>;
    const returnedLetters = user.returnedLetters as Map<string, LetterParams>;

    return JSON.parse(JSON.stringify({ userLetters, returnedLetters }));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteLetter(userId: string, letterId: string) {
  try {
    await connectToDatabase();

    const user = (await User.find({ id: userId }))[0];

    if (!user) throw new Error("User not found");

    const newLetters = user.letters as Map<string, LetterParams>;
    const newReturnedLetters = user.returnedLetters as Map<string, LetterParams>;
    newLetters.delete(letterId);
    newReturnedLetters.delete(letterId);

    await User.findOneAndUpdate({ id: userId }, { $set: { letters: newLetters, returnedLetters: newReturnedLetters } });
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function markLetterAsOpened(userId: string, letterId: string) {
  try {
    await connectToDatabase();

    const user = (await User.find({ id: userId }))[0];

    if (!user) throw new Error("User not found");

    const newReturnedLetters = user.returnedLetters as Map<string, LetterParams>;
    const newReturnedLetter = newReturnedLetters.get(letterId);

    if (!newReturnedLetter) throw new Error("Letter not found");

    newReturnedLetter.opened = true;
    newReturnedLetters.set(letterId, newReturnedLetter);

    await User.findOneAndUpdate({ id: userId }, { $set: { returnedLetters: newReturnedLetters } });
  } catch (error) {
    handleError(error);
  }
}

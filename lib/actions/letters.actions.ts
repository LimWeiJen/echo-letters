"use server"

import { v4 } from "uuid";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { differenceInDays, handleError } from "../utils";
import { generateReturnedLetter } from "../ai/gemini";
import { redirect } from "next/navigation";

// CREATE
export async function createEmptyLetter(userId: string) {
  try {
    await connectToDatabase();

    const user = (await User.find({ id: userId }))[0];

    if (!user) throw new Error("User not found");

    const newLetters = user.letters as Array<LetterParams>;
    const newLetterId = v4()
    newLetters.push({
      title: "",
      dateOfCreation: new Date(),
      id: newLetterId,
      day: differenceInDays(new Date(), user.dateOfCreation),
      content: "",
      opened: true
    });

    await User.findOneAndUpdate({ id: userId }, { $set: { letters: newLetters } });

    redirect(`/create/${newLetterId}`);
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

    const newLetters = (user.letters as Array<LetterParams>).filter(l => l.id !== letterId).push(letter);
    const newReturnedLetters = (user.returnedLetters as Array<LetterParams>).filter(l => l.id !== letterId).push(await generateReturnedLetter(letter, user.settings as SettingsParams));

    await User.findOneAndUpdate({ id: userId }, { $set: { letters: newLetters, returnedLetters: newReturnedLetters } });

    redirect(`/home`)
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

    const userLetter = (user.letters as Array<LetterParams>).find(l => l.id === letterId);
    const returnedLetter = (user.returnedLetters as Array<LetterParams>).find(l => l.id === letterId);

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

    const userLetters = user.letters as Array<LetterParams>;
    const returnedLetters = user.returnedLetters as Array<LetterParams>;

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

    const newLetters = (user.letters as Array<LetterParams>).filter(l => l.id !== letterId);
    const newReturnedLetters = (user.returnedLetters as Array<LetterParams>).filter(l => l.id !== letterId);

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

    let newReturnedLetters = user.returnedLetters as Array<LetterParams>;
    const newReturnedLetter = newReturnedLetters.find(l => l.id === letterId);

    if (!newReturnedLetter) throw new Error("Letter not found");

    newReturnedLetter.opened = true;
    newReturnedLetters = newReturnedLetters.filter(l => l.id !== letterId);
    newReturnedLetters.push(newReturnedLetter);

    await User.findOneAndUpdate({ id: userId }, { $set: { returnedLetters: newReturnedLetters } });
  } catch (error) {
    handleError(error);
  }
}

"use server"

import { GoogleGenerativeAI } from "@google/generative-ai";
import { differenceInDays } from "../utils";

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

if (!API_KEY) throw new Error("Missing GOOGLE_GEMINI_API_KEY");

const genAI = new GoogleGenerativeAI(API_KEY);

export const generateReturnedLetter = async (letter: LetterParams, settings: SettingsParams): Promise<LetterParams> => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(`
You will be replying to a personal letter based on a given description for your tone.
Here is the description: "${settings.defaultAIDescription}"
And here is the letter: "${letter.content}"
Generate the reply letter only.
`)
  const response = result.response;
  const text = response.text();
  const res: LetterParams = {
    title: `Re: ${letter.title}`,
    // TODO: randomize the date of creation
    dateOfCreation: new Date(),
    id: letter.id,
    day: differenceInDays(new Date(), letter.dateOfCreation),
    content: text,
    opened: false
  }
  return res;
}



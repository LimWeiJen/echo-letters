declare type UserParams = {
  id: string;
  dateOfCreation: Date;
  email: string;
  username: string?;
  letters: Array<LetterParams>;
  returnedLetters: Array<LetterParams>;
  settings: SettingsParams;
}

declare type LetterParams = {
  title: string;
  dateOfCreation: Date;
  id: string;
  day: number;
  content: string;
  opened: boolean;
}

declare type SettingsParams = {
  defaultAIDescription: string;
  averageAIRespondTime: number;
}


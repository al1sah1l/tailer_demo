import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {CharacterType, StoryType} from "../../types";
import { v4 as uuidv4 } from 'uuid';

const characterLibrary: CharacterType[] = [
  {
    name: "Vasya",
    species: "cat",
    traits: ["goofy", "humorous"],
    preferences: "carrots",
    avatar: 'card1.png'
  },
  {
    name: "Kolya",
    species: "dinosaur",
    traits: ["mean", "sad"],
    preferences: "swimming",
    avatar: 'card2.png'
  }
];

export interface IAppState {
  currentStory?: StoryType,
  libraryStory?: StoryType[],
  charactersLibrary?: CharacterType[],
  currentCharacters?: CharacterType[],
  currentCharactersNames?: string[],
}

const initialState: IAppState = {
  currentStory: {
    id: uuidv4(),
    textFromVoice: '',
    name: '',
    characters: [],
    charactersNames: [],
    story: '',
  },
  libraryStory: [],
  charactersLibrary: characterLibrary,
  currentCharacters: [],
  currentCharactersNames: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentStory: (state, action: PayloadAction<StoryType>) => {
      state.currentStory = action.payload;
    },
    setterApp: (state, action: PayloadAction<IAppState>) => ({ ...state, ...action.payload }),
  },
});

export const {
  setCurrentStory,
  setterApp,
} = appSlice.actions;

export default appSlice.reducer;

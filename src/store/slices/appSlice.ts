import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { v4 as uuidv4 } from 'uuid';
import {CharacterType, StoryType} from "../../types";

const characterLibrary: CharacterType[] = [
  {
    id: 1,
    name: "Ben",
    species: "cat",
    traits: ["goofy", "humorous"],
    preferences: "carrots",
    avatar: 'card1.png'
  },
  {
    id: 2,
    name: "Oliver",
    species: "dog",
    traits: ["mean", "sad"],
    preferences: "swimming",
    avatar: 'card2.png'
  },
  {
    id: 3,
    name: "Emily",
    species: "kangaroo",
    traits: ["happy", "cheerful"],
    preferences: "playing video games",
    avatar: 'card3.png'
  },
  {
    id: 4,
    name: "George",
    species: "dinosaur",
    traits: ["mysterious"],
    preferences: "school friends",
    avatar: 'card4.png'
  }
];

export interface IAppState {
  currentStory?: StoryType,
  libraryStory?: StoryType[],
  charactersLibrary?: CharacterType[],
  currentCharacters?: CharacterType[],
  currentCharactersNames?: string[],
}

export const defaultStory = () => ({
  id: uuidv4(),
  textFromVoice: '',
  name: '',
  characters: [],
  charactersNames: [],
  story: '',
})

const initialState: IAppState = {
  currentStory: defaultStory(),
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

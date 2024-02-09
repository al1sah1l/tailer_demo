export type CharacterType = {
    id: number;
    name: string;
    species: string;
    traits: string[];
    preferences: string;
    avatar: string;
};

export type StoryType = {
    id: string;
    textFromVoice: string,
    name: string;
    characters: CharacterType[],
    charactersNames: string[];
    story: string;
}

export type KeyTabType = 'Generator' | 'Library' | 'Settings';

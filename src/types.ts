export type CharacterType = {
    name: string;
    species: string;
    trait: string;
    preferences: string;
};

export type StoryType = {
    id: string;
    textFromVoice: string,
    name: string;
    characters: CharacterType[],
    charactersNames: string[];
    story: string;
}

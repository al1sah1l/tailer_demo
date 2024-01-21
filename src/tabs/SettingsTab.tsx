import React from 'react';
import '../App.css';
import {List} from "antd/lib";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";
import {setCurrentStory} from "../store/slices/appSlice";
import {CharacterType, StoryType} from "../types";
import {CharacterCard} from "../components/characterCard";
import {Flex} from "antd";
import { v4 as uuidv4 } from 'uuid';

export const SettingsTab = () => {
    const dispatch = useDispatch<AppDispatch>();
    const charactersLibrary = useSelector<RootState, CharacterType[]>((state) => state.app.charactersLibrary!);

    const onClickStory = (item:StoryType) => () => {
        dispatch(setCurrentStory(item));
    }

    return (
    <Flex justify={"center"} gap={20}>
        {charactersLibrary.map((character) => <CharacterCard key={uuidv4()} character={character}/>)}
    </Flex>
  );
}

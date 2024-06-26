import React, {useState} from 'react';
import '../App.css';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";
import {setCurrentStory} from "../store/slices/appSlice";
import {CharacterType, StoryType} from "../types";
import {CharacterCard} from "../components/characterCard";
import {Flex} from "antd";
import { v4 as uuidv4 } from 'uuid';
import Title from "antd/lib/typography/Title";

export const SettingsTab = () => {
    const charactersLibrary = useSelector<RootState, CharacterType[]>((state) => state.app.charactersLibrary!);

    return <div>
        <Title level={2}>Customize your characters</Title>
        <Flex justify={"center"} gap={20}>
            {charactersLibrary.map((character) => <CharacterCard key={uuidv4()} character={character}/>)}
        </Flex>
    </div>
}

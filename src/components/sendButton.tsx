import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Flex, Input, Row} from "antd";
import handler from "./openAIChat";
import {AudioOutlined} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import {Space} from "antd/lib";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";
import {CharacterType, StoryType} from "../types";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";
import {setCurrentStory} from "../store/slices/appSlice";
import axios from "axios";
import {useLibraryStory} from "../hook/useLibraryStory";

declare global {
    interface Window {
        webkitSpeechRecognition: any;
    }
}

export const SendButton = () => {
    const dispatch = useDispatch<AppDispatch>();
    const getLibraryStory = useLibraryStory();
    const currentStory = useSelector<RootState, StoryType>((state) => state.app.currentStory!);
    const currentCharactersNames = useSelector<RootState, string[]>((state) => state.app.currentCharactersNames!);
    const currentCharacters = useSelector<RootState, CharacterType[]>((state) => state.app.currentCharacters!);

    const [textFromVoice, setTextFromVoice] = useState("");

    useEffect(() => {
        setTextFromVoice(currentStory.textFromVoice);
    }, [currentStory]);

    const onClickSend = async () => {
        console.log("ddddd");
        if (!currentCharacters){
            return;
        }
        const storyCharacters=currentCharacters.map((character) => {
            return `${character.species} whose name is ${character.name}, who likes ${character.preferences} and is ${character.traits}`;
        })

        const newRequest = `Make the story for kid whose request is ${textFromVoice} including these characters: ${storyCharacters.map(value => {return value})}`;
        console.log(newRequest);

        const story = await handler(newRequest);
        if (story){
            const newStory:StoryType = {
                ...currentStory,
                textFromVoice,
                story,
                characters: currentCharacters,
                charactersNames: currentCharactersNames,
                name: story.slice(0,20),
            }
            dispatch(setCurrentStory(newStory));
            const result = await axios.post(process.env.REACT_APP_STORY_URL!, JSON.stringify(newStory));
            getLibraryStory();
        }
    }

    return <Col span={1}>
            <Button type={"default"}
                    onClick={onClickSend}>
                Send
            </Button>
        </Col>
};

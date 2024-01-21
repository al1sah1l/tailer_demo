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

export const RecordButton = () => {
    const dispatch = useDispatch<AppDispatch>();
    const getLibraryStory = useLibraryStory();
    const currentStory = useSelector<RootState, StoryType>((state) => state.app.currentStory!);
    const currentCharactersNames = useSelector<RootState, string[]>((state) => state.app.currentCharactersNames!);
    const currentCharacters = useSelector<RootState, CharacterType[]>((state) => state.app.currentCharacters!);

    const [isRecording, setIsRecording] = useState(false);
    const [recordingComplete, setRecordingComplete] = useState(false);
    // Reference to store the SpeechRecognition instance
    const recognitionRef = useRef<any>(null);

    // Function to start recording
    const startRecording = () => {
        setIsRecording(true);
        // Create a new SpeechRecognition instance and configure it
        recognitionRef.current = new window.webkitSpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        // Event handler for speech recognition results
        recognitionRef.current.onresult = (event: any) => {
            const { transcript } = event.results[event.results.length - 1][0];
            const newStory:StoryType = {
                ...currentStory,
                textFromVoice: transcript,
            }
            dispatch(setCurrentStory(newStory));
        };

        // Start the speech recognition
        recognitionRef.current.start();
    };

    // Cleanup effect when the component unmounts
    useEffect(() => {
        return () => {
            // Stop the speech recognition if it's active
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const stopRecording = () => {
        if (recognitionRef.current) {
            // Stop the speech recognition and mark recording as complete
            recognitionRef.current.stop();
            setRecordingComplete(true);
        }
    };

    const handleToggleRecording = () => {
        setIsRecording(!isRecording);
        if (!isRecording) {
            startRecording();
        } else {
            stopRecording();
            console.log('====', currentStory.story);
            console.log( process.env, process.env.REACT_APP_OPENAI_API_KEY);
            const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
            console.log(apiKey, process.env);
        }
    };

    const onClickSend = async () => {
        console.log("ddddd");
        if (!currentCharacters){
            return;
        }
        const storyCharacters=currentCharacters.map((character) => {
            return `${character.species} whose name is ${character.name}, who likes ${character.preferences} and is ${character.traits}`;
            })

        const newRequest = `Make the story for kid whose request is ${currentStory.textFromVoice} including these characters: ${storyCharacters.map(value => {return value})}`;
        console.log(newRequest);

        const story = await handler(newRequest);
        if (story){
            const newStory:StoryType = {
                ...currentStory,
                //textFromVoice: currentStory.textFromVoice,
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

    return <Col span={2}>
            <Button type={"primary"}
                    onClick={handleToggleRecording}>
                <AudioOutlined />
                Record
            </Button>
        </Col>
};

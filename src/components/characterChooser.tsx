import React, {useEffect} from 'react';
import {Col, Row} from "antd";
import {Select} from "antd/lib";
import {CharacterType, StoryType} from "../types";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";
import {setterApp} from "../store/slices/appSlice";
import {useLibraryStory} from "../hook/useLibraryStory";

export const CharacterChooser = () => {
    const dispatch = useDispatch<AppDispatch>();
    const getLibraryStory = useLibraryStory();
    const currentStory = useSelector<RootState, StoryType>((state) => state.app.currentStory!);
    const currentCharactersNames = useSelector<RootState, string[]>((state) => state.app.currentCharactersNames!);
    const characters = useSelector<RootState, CharacterType[]>((state) => state.app.currentCharacters!);
    const characterLibrary = useSelector<RootState, CharacterType[]>((state) => state.app.charactersLibrary!);

    useEffect(() => {
        getLibraryStory();
    }, []);

    const onChangeCharacterList = (values: string[]) => {
        const newChosenCharacters=values.map((character) => {
            return characterLibrary.filter((listCharacter) => listCharacter.name === character)[0]})
        dispatch(setterApp({currentCharacters:newChosenCharacters}));
        dispatch(setterApp({currentCharactersNames:values}));
    }


    return (
        <Row justify={"center"}>
            <Col span={4} >
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select character"
                    onChange={onChangeCharacterList}
                    options={characterLibrary.map((character) => {
                        return {value:character.name, label:character.name}
                    })}
                />
            </Col>
        </Row>
    );
};

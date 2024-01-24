import React, {useState} from 'react';
import '../App.css';
import {CharacterType} from "../types";
import {Avatar, Flex, Input, Spin} from "antd";
import {setterApp} from "../store/slices/appSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";
import {UserOutlined} from "@ant-design/icons";
import {Select} from "antd/lib";

interface ICharacterCard {
    character: CharacterType,
}

export const CharacterCard: React.FC<ICharacterCard> = ({character}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [spinner, setSpinner] = useState(false);
    const characterLibrary = useSelector<RootState, CharacterType[]>((state) => state.app.charactersLibrary!);

    const processCharacter = (value: string, nameParam: string) => {
        const newCharacterLibrary = characterLibrary.map((subCharacter) => {
            if (subCharacter.name === character.name){
                return {
                    ...subCharacter,
                    [nameParam]: value,
                };
            }
            return subCharacter;
        });

        dispatch(setterApp({charactersLibrary:newCharacterLibrary}))
    }

    const onChangeTraits = (value: string) => {
        processCharacter(value, 'traits');
    }

    const onChangeName = (event: any) => {
        processCharacter(event.target.value, 'name');
    }

    const onChangeSpecies = (event: any) => {
        processCharacter(event.target.value, 'species');
    }

    const onChangePreferences = (event: any) => {
        processCharacter(event.target.value, 'preferences');
    }

    return (
        <Spin spinning={spinner}>
            <Flex
                justify={"space-between"}
                align={"center"}
                vertical
                gap={10}
                style={{padding: 10, width: 300, border:'1px solid grey', borderRadius: 10, margin: 5}}>

                <Avatar size={128} icon={<UserOutlined />} src={`./${character.avatar}`} />
                <Input onChange={onChangeName} placeholder="Name" value={character.name}/>
                <Input onChange={onChangeSpecies} placeholder="Species" value={character.species}/>
                <Input onChange={onChangePreferences} placeholder="Preferences" value={character.preferences}/>
                <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="Traits"
                    value={character.traits as any}
                    onChange={onChangeTraits}
                />
            </Flex>
        </Spin>
    );
}

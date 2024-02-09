import React, {useEffect, useState} from 'react';
import './App.css';
import {Space} from "antd/lib";
import {Tabs} from "antd";
import {CharacterType, KeyTabType, StoryType} from "./types";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./store";
import {defaultStory, setCurrentStory} from "./store/slices/appSlice";
import {useLibraryStory} from "./hook/useLibraryStory";
import LibraryTab from "./tabs/LibraryTab";
import GeneratorTab from "./tabs/GeneratorTab";
import {SettingsTab} from "./tabs/SettingsTab";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const getLibraryStory = useLibraryStory();
    const libraryStory = useSelector<RootState, StoryType[]>((state) => state.app.libraryStory!);

    axios.interceptors.request.use(async (config) => {
        const headers = config.headers as any;
        headers['x-api-key'] = process.env.REACT_APP_STORY_API_KEY;
        return config;
    }, () => {
    });

    const [chosenCharacters, setChosenCharacters] = useState<CharacterType[]>();

    useEffect(() => {
        getLibraryStory();
    }, []);

    const tabManager: {[key in KeyTabType]:React.JSX.Element} = {
        Library: <LibraryTab/>,
        Generator: <GeneratorTab/>,
        Settings: <SettingsTab />
    }

    const onChangeTab = (keyTab: string) => {
        const newKeyTab  = keyTab as KeyTabType;
        if (newKeyTab === "Generator"){
            dispatch(setCurrentStory(defaultStory()));
        }
    }

    return (
        <div className="App">
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Tabs
                    type="card"
                    centered
                    onChange={onChangeTab}
                    items={(Object.keys(tabManager) as  KeyTabType[]).map((tabName) => {
                        return {
                            label: `${tabName}`,
                            key: tabName,
                            children: tabManager[tabName],
                        };
                    })}
                />
            </Space>
        </div>
    );
}

export default App;

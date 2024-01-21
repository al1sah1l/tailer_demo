import React, {useEffect, useState} from 'react';
import './App.css';
import {RecordButton} from "./components/recordButton";
import Title from "antd/lib/typography/Title";
import {Cascader, List, Select, Space} from "antd/lib";
import {Col, Row, Tabs} from "antd";
import {CharacterType, StoryType} from "./types";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./store";
import {setCurrentStory, setterApp} from "./store/slices/appSlice";
import {useLibraryStory} from "./hook/useLibraryStory";
import {CharacterChooser} from "./components/characterChooser";
import LibraryTab from "./tabs/LibraryTab";
import GeneratorTab from "./tabs/GeneratorTab";

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

    const onClickStory = (item:StoryType) => () => {
        dispatch(setCurrentStory(item));
    }

    const tabManager: {[key:string]:React.JSX.Element} = {
        Library: <LibraryTab/>,
        Generator: <GeneratorTab/>,
        Settings: <>Settings</>
    }

    return (
    <div className="App">
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Tabs
                type="card"
                centered
                items={Object.keys(tabManager).map((tabName) => {
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

import React from 'react';
import '../App.css';
import {useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";
import {StoryType} from "../types";
import {Button, Col, Row, Tabs} from "antd";
import {StoryCard} from "../components/storyCard";
import Title from "antd/lib/typography/Title";
import {CloseOutlined} from "@ant-design/icons";
import {v4 as uuidv4} from "uuid";
import {setCurrentStory} from "../store/slices/appSlice";
import {useDispatch} from "react-redux";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export default function LibraryTab() {
    const libraryStory = useSelector<RootState, StoryType[]>((state) => state.app.libraryStory!);
    const currentStory = useSelector<RootState, StoryType>((state) => state.app.currentStory!);
    const dispatch = useDispatch<AppDispatch>();

    const onClickCreateNew = () => {
        const newStory: StoryType= {
            id: uuidv4(),
            textFromVoice: '',
            name: '',
            characters: [],
            charactersNames: [],
            story: ''
        }
        dispatch(setCurrentStory(newStory));
        // add switching to Generator Tab
    }

    return (
        <div>
            <Title level={2}>Explore generated stories</Title>
            <Row style={{margin: '0 10%'}}>
                <Col span={6} style={{padding: 20}}>
                    {libraryStory.map((story) => {
                        return <StoryCard key={story.id} story={story}/>
                    })}
                    <Button onClick={onClickCreateNew}>
                        <CloseOutlined />
                    </Button>
                </Col>
                <Col span={18} style={{padding: 20}}>
                    <p>{currentStory.story}</p>
                </Col>
            </Row>
        </div>
    );
}

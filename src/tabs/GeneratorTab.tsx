import React, {useState} from 'react';
import '../App.css';
import {Space} from "antd/lib";
import {RecordButton} from "../components/recordButton";
import Title from "antd/lib/typography/Title";
import {CharacterChooser} from "../components/characterChooser";
import {Col, Row} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";
import {StoryType} from "../types";
import {setCurrentStory} from "../store/slices/appSlice";
import {SendButton} from "../components/sendButton";

export default function GeneratorTab() {
    const dispatch = useDispatch<AppDispatch>();
    const currentStory = useSelector<RootState, StoryType>((state) => state.app.currentStory!);
    const [activeTab, setActiveTab] = useState('generator');

    const onChangeTextRequest = (event: any) => {
        console.log(event.target.value);
        const newStory:StoryType = {
            ...currentStory,
            textFromVoice: event.target.value,
        }
        dispatch(setCurrentStory(newStory));
    }

    return (
    <div>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Title level={2}>Generate your story</Title>
            <CharacterChooser/>
            <Row justify="space-around">
                <Col span={10}>
                    <TextArea
                        value={currentStory.textFromVoice}
                        onChange={onChangeTextRequest}
                        placeholder="Input your request"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                </Col>
            </Row>
            <Row justify="center">
                <RecordButton />
                <SendButton />
            </Row>
            <Row justify={"center"}>
                <Col span={14}>
                    <p style={{textAlign: "left"}}>
                        {currentStory.story}
                    </p>
                </Col>
            </Row>
        </Space>
    </div>
  );
}

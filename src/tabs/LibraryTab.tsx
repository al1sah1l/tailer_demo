import React from 'react';
import '../App.css';
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {StoryType} from "../types";
import {Col, Row, Tabs} from "antd";
import {StoryCard} from "../components/storyCard";
import Title from "antd/lib/typography/Title";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export default function LibraryTab() {
    const libraryStory = useSelector<RootState, StoryType[]>((state) => state.app.libraryStory!);
    const currentStory = useSelector<RootState, StoryType>((state) => state.app.currentStory!);

    return (
        <div>
            <Title level={2}>Explore generated stories</Title>
            <Row style={{margin: '0 10%'}}>
                <Col span={6} style={{padding: 20}}>
                    {libraryStory.map((story) => {
                        return <StoryCard key={story.id} story={story}/>
                    })}
                </Col>
                <Col span={18} style={{padding: 20}}>
                    <p>{currentStory.story}</p>
                </Col>
            </Row>
        </div>
    );
}

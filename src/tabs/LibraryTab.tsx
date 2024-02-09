import React, {useRef, useState} from 'react';
import {List} from "antd/lib";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";
import {setCurrentStory, setterApp} from "../store/slices/appSlice";
import {Col, Row, Tabs} from "antd";
import { StoryCard } from '../components/storyCard';
import {StoryType} from "../types";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export default function LibraryTab() {
    const dispatch = useDispatch<AppDispatch>();
    const libraryStory = useSelector<RootState, StoryType[]>((state) => state.app.libraryStory!);
    const currentStory = useSelector<RootState, StoryType>((state) => state.app.currentStory!);

    const onClickStory = (item:StoryType) => () => {
        dispatch(setCurrentStory(item));
    }

    const [activeKey, setActiveKey] = useState(currentStory.id);
    const [items, setItems] = useState(libraryStory);
    const newTabIndex = useRef(0);

    const onChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
    };

    const remove = (targetKey: TargetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.id === targetKey) {
                lastIndex = i - 1;
            }
        });


        const newPanes = items.filter((item) => item.id !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].id;
            } else {
                newActiveKey = newPanes[0].id;
            }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const onEdit = (
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: 'add' | 'remove',
    ) => {
        if (action === 'remove') {
            remove(targetKey);
        }
    };

    return (
        <div>
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

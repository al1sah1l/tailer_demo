import React from 'react';
import '../App.css';
import {List} from "antd/lib";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";
import {setCurrentStory} from "../store/slices/appSlice";
import {StoryType} from "../types";

export default function LibraryTab() {
    const dispatch = useDispatch<AppDispatch>();
    const libraryStory = useSelector<RootState, StoryType[]>((state) => state.app.libraryStory!);

    const onClickStory = (item:StoryType) => () => {
        dispatch(setCurrentStory(item));
    }

    return (
    <div>
        <List
            size="small"
            bordered
            dataSource={libraryStory}
            renderItem={(item) => <List.Item onClick={onClickStory(item)}>{item.name}</List.Item>}/>
    </div>
  );
}

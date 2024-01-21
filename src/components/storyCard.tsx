import React, {useState} from 'react';
import '../App.css';
import {useLibraryStory} from "../hook/useLibraryStory";
import {StoryType} from "../types";
import {Avatar, Button, Flex, Spin} from "antd";
import axios from "axios";
import {setCurrentStory} from "../store/slices/appSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";
import {CloseOutlined, UserOutlined} from "@ant-design/icons";

interface IStoryCard {
    story: StoryType,
}

export const StoryCard: React.FC<IStoryCard> = ({story}) => {
    const dispatch = useDispatch<AppDispatch>();
    const getLibraryStory = useLibraryStory();
    const [spinner, setSpinner] = useState(false);
    const currentStory = useSelector<RootState, StoryType>((state) => state.app.currentStory!);

    const onClickDelete = async () => {
        setSpinner(true);
        try {
            await axios.delete<StoryType[]>(`${process.env.REACT_APP_STORY_URL!}?id=${story.id}`);
            getLibraryStory();
        } catch (e) {
            console.log(e);
        }
        setSpinner(false);
    }

    const onClickSelect = () => {
        dispatch(setCurrentStory(story));
    }
    console.log(story.characters)
    return (
        <Spin spinning={spinner}>
            <div onClick={onClickSelect} style={{padding: 10, border:'1px solid grey', borderRadius: 10, margin: 5, backgroundColor: currentStory.id === story.id ? '#ebfeff' : 'white'}}>
                <Flex
                justify={"space-between"}
                align={"center"}>
                <p>{story.name}</p>
                <Button onClick={onClickDelete}>
                    <CloseOutlined />
                </Button>
            </Flex>
            <Flex justify={"start"} align={"center"} gap={5}>
                <p>Character:</p>
                {
                    story.characters?.map((character) => <Avatar size={32} key={character.name} icon={<UserOutlined />} src={`./${character.avatar}`} />)
                }

            </Flex>
                </div>
        </Spin>
    );
}

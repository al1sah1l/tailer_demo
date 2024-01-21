import {StoryType} from "../types";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store";
import {setterApp} from "../store/slices/appSlice";
import axios from "axios";

export const useLibraryStory = () => {
    const dispatch = useDispatch<AppDispatch>();
    const getter = () => {
        (async () => {
            const stories = (await axios.get<StoryType[]>(process.env.REACT_APP_STORY_URL!)).data;
            dispatch(setterApp({libraryStory: stories || []}))
        })();
    }

    return getter;
};

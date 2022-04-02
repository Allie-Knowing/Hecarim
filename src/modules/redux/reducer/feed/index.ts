import { 
    GET_VIDEO_ANSWER_LIST_SUCCESS, 
    GET_VIDEO_ANSWER_LIST_FAILURE
} from "modules/redux/action/feed/interface";
import FeedState from "./interface";
import { feedActionType } from "modules/redux/action/feed";

const initState: FeedState = {
    getVideoAnswerListResponse: {
        data: []
    },
    error: {
        status: 0,
        message: '',
        type: '',
    }
}

const feedReducer = (
    state: FeedState = initState,
    action: feedActionType
): FeedState => {
    switch (action.type) {
        case GET_VIDEO_ANSWER_LIST_SUCCESS: 
            return {
                ...state,
                getVideoAnswerListResponse: {
                    data: action.payload.data
                }
            }
        case GET_VIDEO_ANSWER_LIST_FAILURE: 
            return {
                ...state,
                error: action.payload,
            }
        default: 
            return state;
    }
}

export default feedReducer;
import { profileActionType } from "modules/redux/action/profile";
import {
  GET_PROFILE_FAILURE,
  GET_PROFILE_QUESTION_LIST_FAILURE,
  GET_PROFILE_QUESTION_LIST_SUCCESS,
  GET_PROFILE_SUCCESS,
  SET_ID,
} from "modules/redux/action/profile/interface";
import ProfileState from "./interface";

const initState: ProfileState = {
  profileError: {
    status: 0,
    message: "",
    type: "",
  },
  questionError: {
    status: 0,
    message: "",
    type: "",
  },
  profile: "",
  name: "",
  videoCnt: -1,
  userId: 0,
  questionList: [],
};

const profileReducer = (
  state: ProfileState = initState,
  action: profileActionType
): ProfileState => {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload.profile,
        name: action.payload.name,
        videoCnt: action.payload.video_cnt,
      };
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        profileError: action.payload,
      };
    case GET_PROFILE_QUESTION_LIST_SUCCESS:
      return {
        ...state,
        questionList: action.payload,
      };
    case GET_PROFILE_QUESTION_LIST_FAILURE:
      return {
        ...state,
        questionError: action.payload,
      };
    case SET_ID:
      return {
        ...state,
        uesrId: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;

import { profileActionType } from "modules/redux/action/profile";
import {
  GET_PROFILE_FAILURE,
  GET_PROFILE_SUCCESS,
} from "modules/redux/action/profile/interface";
import ProfileState from "./interface";

const initState: ProfileState = {
  error: {
    status: 0,
    message: "",
    type: "",
  },
  profile: "",
  name: "",
  videoCnt: -1,
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
        error: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;

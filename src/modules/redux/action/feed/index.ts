import { 
  GET_VIDEO_ANSWER_LIST, 
  GET_VIDEO_ANSWER_LIST_SUCCESS, 
  GET_VIDEO_ANSWER_LIST_FAILURE,
} from "./interface";
import { createAction } from "typesafe-actions";
import { getVideoAnswerListResponse } from "constance/feed";
import { error } from "modules/dto/error";

export const getVideoAnswerList = createAction(GET_VIDEO_ANSWER_LIST)();
export const getVideoAnswerListSuccess = createAction(GET_VIDEO_ANSWER_LIST_SUCCESS)<getVideoAnswerListResponse>();
export const getVideoAnswerListFailure = createAction(GET_VIDEO_ANSWER_LIST_FAILURE)<error>();

export type feedActionType = 
    | ReturnType<typeof getVideoAnswerList>
    | ReturnType<typeof getVideoAnswerListSuccess>
    | ReturnType<typeof getVideoAnswerListFailure>

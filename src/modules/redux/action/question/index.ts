import { createAction } from "typesafe-actions";
import { error } from "modules/dto/error";
import { 
  GET_QUESTION_LIST,
  GET_QUESTION_LIST_SUCCESS,
  GET_QUESTION_LIST_FAILURE
} from "./interface";

export const getQuestionList = createAction(GET_QUESTION_LIST)();
export const getQuestionListSucess = createAction(GET_QUESTION_LIST_SUCCESS)();
export const getQuestionListFailure = createAction(GET_QUESTION_LIST_FAILURE)<error>();

export type qeustionActionType = 
    | ReturnType<typeof getQuestionList>
    | ReturnType<typeof getQuestionListSucess>
    | ReturnType<typeof getQuestionListFailure>
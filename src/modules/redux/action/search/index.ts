import { 
  GET_AUTO_COMPLETE,
  GET_AUTO_COMPLETE_SUCCESS,
  GET_AUTO_COMPLETE_FAILURE
} from "./interface";
import { createAction } from "typesafe-actions";
import { searchPayload } from "constance/search";
import { searchAutoCompleteResponse } from "modules/dto/response/searchResponse";
import { error } from "modules/dto/error";

export const getAutoComplete = createAction(GET_AUTO_COMPLETE)<searchPayload>();
export const getAutoCompleteSuccess = createAction(GET_AUTO_COMPLETE_SUCCESS)<searchAutoCompleteResponse>();
export const getAutoCompleteFailure = createAction(GET_AUTO_COMPLETE_FAILURE)<error>();

export type searchActionType = 
    | ReturnType<typeof getAutoComplete>
    | ReturnType<typeof getAutoCompleteSuccess>
    | ReturnType<typeof getAutoCompleteFailure>
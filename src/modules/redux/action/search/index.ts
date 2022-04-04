import { 
  GET_TITLE_SEARCH,
  GET_TITLE_SEARCH_SUCCESS,
  GET_TITLE_SEARCH_FAILURE
} from "./interface";
import { createAction } from "typesafe-actions";
import { searchPayload } from "constance/search";
import { searchTitleResponse } from "modules/dto/response/searchResponse";
import { error } from "modules/dto/error";

export const getAutoComplete = createAction(GET_TITLE_SEARCH)<searchPayload>();
export const getAutoCompleteSuccess = createAction(GET_TITLE_SEARCH_SUCCESS)<searchTitleResponse>();
export const getAutoCompleteFailure = createAction(GET_TITLE_SEARCH_FAILURE)<error>();

export type searchActionType = 
    | ReturnType<typeof getAutoComplete>
    | ReturnType<typeof getAutoCompleteSuccess>
    | ReturnType<typeof getAutoCompleteFailure>
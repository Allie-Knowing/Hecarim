import { createAction } from "typesafe-actions";
import {
  POST_LIKE,
  POST_LIKE_SUCCESS,
  POST_LIKE_FAILURE,
  DELETE_LIKE,
  DELETE_LIKE_SUCCESS,
  DELETE_LIKE_FAILURE,
} from "./interface";
import { error } from "modules/dto/error";
import { deleteLikeResponse, postLikeResponse } from "constance/like";

export const postLike = createAction(POST_LIKE)();
export const postLikeSuccess =
  createAction(POST_LIKE_SUCCESS)<postLikeResponse>();
export const postLikeFailure = createAction(POST_LIKE_FAILURE)<error>();

export const deleteLike = createAction(DELETE_LIKE)();
export const deleteLikeSuccess =
  createAction(DELETE_LIKE_SUCCESS)<deleteLikeResponse>();
export const deleteLikeFailure = createAction(DELETE_LIKE_FAILURE)<error>();

export type likeActionType =
  | ReturnType<typeof postLike>
  | ReturnType<typeof postLikeSuccess>
  | ReturnType<typeof postLikeFailure>
  | ReturnType<typeof deleteLike>
  | ReturnType<typeof deleteLikeSuccess>
  | ReturnType<typeof deleteLikeFailure>;

import { createAction } from "typesafe-actions";
import { POST_LIKE, POST_LIKE_SUCCESS, POST_LIKE_FAILURE } from "./interface";
import { error } from "modules/dto/error";
import { postLikeResponse } from "constance/like";

export const postLike = createAction(POST_LIKE)();
export const postLikeSuccess =
  createAction(POST_LIKE_SUCCESS)<postLikeResponse>();
export const postLikeFailure = createAction(POST_LIKE_FAILURE)<error>();

export type likeActionType =
  | ReturnType<typeof postLike>
  | ReturnType<typeof postLikeSuccess>
  | ReturnType<typeof postLikeFailure>;

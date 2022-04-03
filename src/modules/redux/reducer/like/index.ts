import { postLike } from "constance/like";
import { error } from "modules/dto/error";

export interface LikeState {
  body: postLikeResponse;
  error: error;
}

export type postLikeResponse = {
  data: postLike;
};

import { error } from "modules/dto/error";
import { likeRequest } from "modules/dto/request/likeRequest";
export interface LikeState {
  likeRequest: likeRequest;
  error: error;
}

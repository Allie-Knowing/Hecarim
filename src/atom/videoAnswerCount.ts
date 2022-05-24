import atomKeys from "constant/atomKeys";
import { atom } from "recoil";

const videoAnswerCountState = atom<number | undefined>({
  default: 0,
  key: atomKeys.videoAnswerCount,
});

export default videoAnswerCountState;

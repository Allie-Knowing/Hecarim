import uri from "constance/uri";
import { instance } from "utils/axios";

export const getVideoAnswerList = async () => {
    try {
        return await instance.get(uri.video_answer);
    } catch (error) {
        throw error;
    }
}

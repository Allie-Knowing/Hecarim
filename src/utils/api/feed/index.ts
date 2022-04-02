import uri from "constance/uri";
import { getRequestWithAccessToken } from "../default";

export const getVideoAnswerList = async (access_token: string) => {
    try {
        const request = getRequestWithAccessToken(access_token, 'text');
        return await request.get(uri.video_answer);
    } catch (error) {
        throw error;
    }
}

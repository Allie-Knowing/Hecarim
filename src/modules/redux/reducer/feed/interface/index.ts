import { error } from 'modules/dto/error';
import { getVideoAnswerList } from 'constance/feed';

export default interface FeedState {
    getVideoAnswerListResponse: getVideoAnswerListResponse;
    error: error;
}

export type getVideoAnswerListResponse = {
    data: getVideoAnswerList[];
}

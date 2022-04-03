import { error } from 'modules/dto/error';
import { getVideoAnswerList } from 'constance/feed';

export interface FeedState {
    videoAnswerList: getVideoAnswerListResponse;
    error: error;
}

export type getVideoAnswerListResponse = {
    data: getVideoAnswerList[];
}

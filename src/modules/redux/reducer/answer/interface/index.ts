import { error } from 'modules/dto/error';
import { getVideoAnswerList } from 'modules/dto/response/answerResponse';

export interface answerState {
    videoAnswerList: getVideoAnswerListResponse;
    error: error;
}

export type getVideoAnswerListResponse = {
    data: getVideoAnswerList[];
}

import { error } from "modules/dto/error";
import { ProfileQuestionType } from "modules/dto/response/getProfileQuestionListResponse";

interface ProfileState {
  profileError: error;
  questionError: error;
  profile: string;
  name: string;
  videoCnt: number;
  questionList: ProfileQuestionType[];
}

export default ProfileState;

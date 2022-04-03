import { error } from "modules/dto/error";
import { profileResponse } from "modules/dto/response/getProfileResponse";

interface ProfileState {
  error: error;
  profile: string;
  name: string;
  videoCnt: number;
}

export default ProfileState;

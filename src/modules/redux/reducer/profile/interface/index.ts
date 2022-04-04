import { error } from "modules/dto/error";

interface ProfileState {
  error: error;
  profile: string;
  name: string;
  videoCnt: number;
}

export default ProfileState;

import { VideoCodec } from "expo-camera/build/Camera.types";

export interface VideoDataType {
  uri: string;
  codec?: VideoCodec | undefined;
}

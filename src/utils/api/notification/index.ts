import { instance } from "utils/axios"

export const postExpoToken = (token: string) => {
    return instance.patch("/expo/token", {
        token,
    });
}
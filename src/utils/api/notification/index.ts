import { instance } from "utils/axios"

export const postExpoToken = (token: string) => {
    console.log(123, token);
    return instance.patch("/user/expo/token", {
        token,
    });
}
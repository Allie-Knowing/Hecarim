export type getVideoAnswerList = {
    id?: number,
    title?: string,
    user_id?: number,
    profile?: string,
    video_url?: string,
    created_at?: string,
    like_cnt?: string,
    is_adoption?: number,
} 

export type getVideoAnswerListResponse = {
    data?: getVideoAnswerList[];
}

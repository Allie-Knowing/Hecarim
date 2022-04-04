export type hashTagData = {
    id: number,
    title: string
}

export type questionResponseList = {
    id: number,
    description: string,
    title: string,
    video_url: string,
    created_at: string,
    user_id: number,
    profile: string,
    comment_cnt: string,
    like_cn: string,
    hash_tag: hashTagData[]
}   
export type questionResponse = {
    data: questionResponseList[]
}
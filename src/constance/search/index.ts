export type searchPayload = {
    q?: string
}

export type searchTitle = {
    id: string,
    title: string,
    description: string,
    thumbnail: string
}

export type searchTitleResponse = {
    data: searchTitle[];
} 
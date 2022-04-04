export type searchString = {
    search_string: string
}

export type searchAutoComplete = {
    id: string,
    source: searchString
}

export type searchAutoCompleteResponse = {
    data: searchAutoComplete[];
} 

import { error } from "modules/dto/error";

export interface SearchState {
    searchTitle: searchTitleResponse;
    error: error;
}

export type searchTitle = {
    id: string,
    title: string
}

export type searchTitleResponse = {
    data: searchTitle[];
} 
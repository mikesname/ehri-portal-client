import {SelectHTMLAttributes} from '@vue/runtime-dom';
import axios from 'axios';


export interface Config {
    title: string,
    repoId: string,
    endpoint: string,
}

export interface SearchItemDescription {
    languageCode: string,
    name: string,
}

export interface SearchItemAttributes {
    localId: string,
    alternateIds: string[],
    descriptions: SearchItemDescription[],
}

export interface SearchItem {
    id: string;
    attributes: SelectHTMLAttributes
}

export interface ApiPage<T> {
    data: T,
    meta: {
        total: number,
        pages: number,
    }
}

export interface ApiItem<T> {
    data: T;
    included: object;
}

export class DataApi {
    endpoint: string;
    repoId: string;

    constructor(endpoint: string, repoId: string) {
        this.endpoint = endpoint;
        this.repoId = repoId;
    }

    async search(q?: string, page?: number): Promise<ApiPage<SearchItem>> {
        let r = await axios.get<ApiPage<SearchItem>>(`${this.endpoint}${this.repoId}/search`, {
            params: {
                q,
                page
            }
        });
        return r.data;
    }

    async get(id: string): Promise<SearchItem> {
        let {data} = await axios.get<ApiItem<SearchItem>>(`${this.endpoint}${id}`)
        return data.data;
    }
}
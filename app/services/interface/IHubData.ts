export interface IHubData {
    results: Result[];
}

export interface Result {
    id: number;
    user: number;
    type: string;
    datetime: string;
    activity_id?: number;
    photos: Photo[];
    mood?: string;
    notes?: string;
    title?: string;
    likes: number[];
}

export interface Photo {
    id: number;
    title: string;
    file: string;
    width: number;
    height: number;
}

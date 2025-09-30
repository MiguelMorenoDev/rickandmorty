export interface ICharacter {
    id: number;
    name:string;
    status: 'Alive' | 'Dead' | 'unknown';
    species: string;
    type?: string | null;
    gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
    origin?: {
        name?:string | null;
        url?: string | null;
    } | null;

    location?: {
        name?: string | null ;
        url?: string | null;
    } | null ;

    image: string;
    episode: string[];
    url?: string | null;
    created?: string | null;
}

export interface ICharacterFilters {
    name?: string;
    status?: string;
    species?: string;
    type?: string;
    gender?: string;
}
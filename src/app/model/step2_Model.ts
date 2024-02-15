export interface Config {
    id: number;
    description: string;
    range: number;
    speed: number;
    price: number;
}

export interface Options{
    configs : Config[];
    towHitch : boolean;
    yoke : boolean;
}
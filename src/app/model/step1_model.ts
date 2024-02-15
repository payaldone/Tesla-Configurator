export interface Model {
    code: string;
    description: string;
    colors: Color[]
}

export interface Color {
    code: string;
    description: string;
    price: number;
}

// To get car images
export const Image_URL = 'https://interstate21.com/tesla-app/images/';



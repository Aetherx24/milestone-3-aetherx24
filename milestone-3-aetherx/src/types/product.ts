export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: {
        id: number;
        name: string;
        image: string;
        creationAt: string;
        updatedAt: string;
    };
    images: string[];
    creationAt: string;
    updatedAt: string;
    rating: {
        rate: number;
        count: number;
    };
}
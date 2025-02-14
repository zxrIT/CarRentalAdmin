export interface ICar {
    id: string;
    name: string;
    displacement: string;
    specifications: string;
    energy: string;
    volume: number;
    actuation: string;
    status: boolean;
    firstTag: string;
    secondTag: string;
    thirdTag: string;
    fourthTag: string;
    originalPrice: number;
    currentPrice: number;
    carImage: string;
    fuelOilNumber: number;
    seats: number;
    brand: string
}

export interface ICarShow {
    displacement: string;
    volume: string;
    id: string;
    specifications: string;
    name: string;
    image: string;
    tags: string[];
    originalPrice: string;
    currentPrice: string;
    brand: string;
    actuation: string;
    energy: string;
    fuelOilNumber: string;
    seats: string;
    status: string;
}
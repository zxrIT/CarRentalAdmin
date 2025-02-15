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

export interface ICarDetails {
    id: string;
    autoAirConditioner: string
    airSystem: string
    chair: string
    driverAssistanceImage: boolean
    carPlayer: boolean
    skylight: boolean
    radar: boolean
    tirePressureMonitoringFunction: string
    bluetoothUSB: string
    nearAndFarLightType: string
    automaticParking: boolean
    launchWithOneClick: boolean
}

export interface ICarDetailsShow {
    id: string;
    name: string;
    carImage: string;
    autoAirConditioner: string
    airSystem: string
    chair: string
    driverAssistanceImage: string
    carPlayer: string
    skylight: string
    radar: string
    tirePressureMonitoringFunction: string
    bluetoothUSB: string
    nearAndFarLightType: string
    automaticParking: string
    launchWithOneClick: string
}
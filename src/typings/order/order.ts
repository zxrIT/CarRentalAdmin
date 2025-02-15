export interface IOrder {
    orderNo: string;
    type: string;
    carType: string;
    startTime: Date;
    endTime: Date;
    amount: number;
    userId: string;
    status: number
}

export interface IOrderShow {
    orderNo: string;
    type: string;
    carType: string;
    startTime: string;
    endTime: string;
    amount: string;
    userId: string;
    status: string;
}
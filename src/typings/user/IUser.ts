export interface IUser {
    id: string;
    username: string;
    phone: string
    roleId: number
    userIcon: string
    points: number
    password: string
    account: string
}

export interface IUserShow {
    id: string;
    username: string;
    phone: string
    roleId: string
    userIcon: string
    points: number
    password: string
    account: string
}
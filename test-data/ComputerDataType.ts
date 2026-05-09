export interface ComputerDataType {
    loginCred?: { username: string, password: string },
    computerCompType: string,
    processor: string,
    ram: string,
    hdd: string,
    software: string,
    os?: string,
    quantity?: number
}
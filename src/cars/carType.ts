export type CarType = {
    registrationNumber: String,
    color: "BLACK" | "WHITE" | "GRAY" | "BLUE" | "RED" | undefined,
    brand: "Mercedes" | "Audi" | "BMW" | undefined,
    price? : Number
}
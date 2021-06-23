import mongoose from "mongoose"
import { CarType } from "./carType";

// type CarColor =
//     "BLACK" | "WHITE" | "GRAY" | "RED" | "BLUE"

const carSchema = new mongoose.Schema({
    registrationNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v: string) {return /^[A-Z0-9]{3}-[A-Z0-9]{4}-[A-Z0-9]{3}/.test(v)},
            message: props => `${props.value} is not a valid registration number. It must follow this pattern : XXX-XXXX-XXX, with X being a number or an uppercase character.`
        }
    },
    color: {
        type: String,
        enum: ["BLACK", "WHITE", "GRAY", "RED", "BLUE"],
        required: true
    },
    brand: {
        type: String,
        enum: ["Mercedes","Audi", "BMW"],
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0,
        validate: {
            validator: function (v : Number) { return v >= 0 },
            message: props => `${props.value} must be positive.`
        }
    }
}, {
    versionKey: false
});

export const Car = mongoose.model<CarType>("car", carSchema)
export function get(
    callback: ((err: any, docs: any[]) => void) | undefined,
    limit?: any) {
    Car.find(callback).limit(limit)
}
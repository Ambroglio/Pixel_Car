import { Request, Response } from "express";
import { Car, get as getAll } from "./carModel";
import { CarType } from "./carType";
import { CustomRequest } from "../misc";
import { CallbackError, Error } from "mongoose";

//get all cars
export function index(
    req: Request,
    res: Response) {
    getAll((err, cars) => {
        if (err) {
            return res.json({
                status: "error",
                message: err
            })
        }
        return res.json({
            status: "success",
            message: "Cars successfully retrieved.",
            data: cars
        })
    })
}

//create new car
export function newCar(
    req: CustomRequest<CarType>,
    res: Response) {
    const car = new Car()

    const body = req.body

    car.registrationNumber = body.registrationNumber ? body.registrationNumber : ""
    car.brand = body.brand ? body.brand : undefined
    car.color = body.color ? body.color : undefined
    car.price = body.price ? body.price : 0

    car.save((err: CallbackError) => {
        if (err) {
            return res.json({
                message: err.message
            })
        }
        return res.json({
            message: "Car successfully created.",
            data: car
        })
    })
}

//get a car by id
export function view(req: Response, res: Response<{ message: String, data?: CarType }>) {
    Car.findById(req.params.car_id, (err: CallbackError, car: CarType) => {
        if (err) {
            return res.json({ message: err.message })
        } else {
            return res.json({ message: "Car successfully fetched.", data: car })
        }
    })
}

//update a car by id
export function update(req: CustomRequest<CarType>, res: Response) {
    Car.findById(req.params.car_id, (err: CallbackError, car: any) => {
        if (err) {
            return res.json({ message: err.message })
        }

        const body = req.body

        car.color = body.color ? body.color : undefined
        car.price = body.price ? body.price : 0

        car.save((err: CallbackError) => {
            if (err) {
                return res.json({
                    message: err.message
                })
            }
            return res.json({
                message: "Car successfully updated.",
                data: car
            })
        })
    })
}

//delete a car by id
export function deleteCar (req: Request, res: Response) {
    Car.remove({
        _id: req.params.car_id
    }, (err: CallbackError) => {
        if (err) {
            return res.json({
                message: err.message
            })
        }
        return res.json({
            message: "Car successfully deleted."
        })
    })
}
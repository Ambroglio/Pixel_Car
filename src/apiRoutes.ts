import express, {Response, Request } from 'express';
import * as carController from "./cars/carController"

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
    res.json({
        status: "API is working",
        message: "Welcome to Pixel Car API !"
    })
})

router.route("/cars")
    .get(carController.index)
    .post(carController.newCar)

router.route("/cars/:car_id")
    .get(carController.view)
    .put(carController.update)
    .delete(carController.deleteCar)

export { router as apiRoutes }
import express from 'express';
import { apiRoutes } from "./apiRoutes"
import bodyParser from 'body-parser';
import mongooose from 'mongoose';
import { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded(
    { extended: true }
))
app.use(bodyParser.json())

mongooose.connect("mongodb://localhost/pixelCar", { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongooose.connection

if (!db)
    console.log("Error connecting db.")
else
    console.log("Database connected successfully.")

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Pixel Car.');
});
app.use("/api", apiRoutes)

app.listen(port, () => {
    return console.log(`Server is listening on ${port}.`);
});

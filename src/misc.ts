import { Request } from "express";

export interface CustomRequest<T> extends Request {
    params: Request.Params,
    body: T
}
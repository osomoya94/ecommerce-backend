import { NextFunction, Request, Response } from "express";

export function loggerGlobalMiddleware(req:Request, res:Response, next:NextFunction) {
  
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  const { method, url } = req;
  const actualDate = new Date();

  const date = actualDate.toLocaleDateString();
  const time = actualDate.toLocaleTimeString();

  console.log(`Date: ${date} Time: ${time} Method: ${method} URL: ${url}`);
  next();
}
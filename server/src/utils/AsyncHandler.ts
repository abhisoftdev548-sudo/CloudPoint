import type {Request,  Response, NextFunction} from 'express';

type AsyncFunction = (req: Request,  res: Response, next: NextFunction) => Promise<any>;
const AsyncHandler = (requestHandler: AsyncFunction) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            await requestHandler(req, res, next);
        }catch(error){
            next(error);
        }
    }
}
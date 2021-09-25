import express from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();

router.post('/api/users/signup',
body('username').isEmail(),
body('password').isLength({ min: 5, max: 20 }),
(req: express.Request, res: express.Response) =>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array())
    }

    throw new DatabaseConnectionError()
})

export {router as SignupUserRoute}
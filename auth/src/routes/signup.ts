import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post('/api/users/signup',
body('username').isEmail(),
body('password').isLength({ min: 5, max: 20 }),
(req: express.Request, res: express.Response) =>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Invalid email or password")
    }

    throw new Error("Invalid DB Connection")
})

export {router as SignupUserRoute}
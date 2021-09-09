import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post('/api/users/signup',
body('username').isEmail(),
body('password').isLength({ min: 5, max: 20 }),
(req: express.Request, res: express.Response) =>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      
    }

    res.send('User created.')
})

export {router as SignupUserRoute}
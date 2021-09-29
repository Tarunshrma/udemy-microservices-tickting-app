import express from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user'
import { BadRequestError } from '../errors/bad-request-error'

const router = express.Router();

router.post('/api/users/signup',
body('username').isEmail(),
body('password').isLength({ min: 5, max: 20 }),
async (req: express.Request, res: express.Response) =>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array())
    }

    const {username, password} = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const doc = new User({
      username: username,
      password: password
    });

    await doc.save();
    
    res.status(201).send(doc);
})

export {router as SignupUserRoute}
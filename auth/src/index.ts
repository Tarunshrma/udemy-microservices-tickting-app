import express from 'express'
import { json } from 'body-parser'
import { CurrentUserRoute } from './routes/current-user';
import { SigninUserRoute } from './routes/signin';
import { SignoutUserRoute } from './routes/signout';
import { SignupUserRoute } from './routes/signup';

const app = express()
app.use(json());

app.use(SignupUserRoute);
app.use(SigninUserRoute);
app.use(SignoutUserRoute);
app.use(CurrentUserRoute);

app.listen(3000, () => {
    console.log("Listning at port 3000");
})
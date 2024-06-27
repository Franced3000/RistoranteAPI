
import express, { Application, Request, Response } from 'express'
import router from './routes'; 

require('dotenv').config();
const app: Application = express()
const port = process.env.PORT;
const syncDatabase = require('./db/sync');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async(req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({ message: `Benvenuto nell'API di root del ristorante! http://localhost:${port}/` })
})

app.use(router);


try {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    })
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(`Error occurred: ${error.message}`)
    } else {
        console.log(`Unknown error occurred`)
    }
}
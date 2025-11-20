import routes from './routes/indexRoutes.js'
import express from 'express'
import cors from 'cors'
import connectDb from './config/db.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api', routes)

const PORT = process.env.PORT || 3000
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log('Server is running on port 3000');
    })
    console.log('Connected to database')
}).catch((err) => console.log(err))

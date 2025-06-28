import express from 'express'
const app = express()
app.use(express.json())
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 5000
import cors from 'cors'
app.use(cors({
    origin: 'https://leet-code-tracker-frontend-gamma.vercel.app',
    credentials: true
}))


import connectDB from './database/db.js'
connectDB()
import router from './routes/pageRoutes.js'
app.use('/', router)

app.listen(PORT , () => {
    console.log(`Server is listening to: ${PORT}`)
})


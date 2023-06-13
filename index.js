import express from 'express'
import initApp from './modules/app.route.js'
import dotenv from 'dotenv'
import connectDB from './DB/connection.js'
dotenv.config()
const app = express()
const port = 3000
initApp(app, express)
connectDB().then(()=>{
    app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))
})

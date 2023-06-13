import userRouter from './user/user.route.js'
import authRouter from './auth/auth.route.js'
const initApp = (app, express)=>{
    app.use(express.json())
    app.get('/', (req,res)=>{
        return res.send("hello..!")
    })
    app.use('/user',userRouter)
    app.use(authRouter)
    app.use('*', (req,res)=>{
        res.json({message:"page not found"})
    })
}

export default initApp
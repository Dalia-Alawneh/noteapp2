import jwt from 'jsonwebtoken'

export const auth =async (req,res, next)=>{
    let {authorization} = req.headers
    if(!authorization){
        return res.json({message:"invalid token"})
    }else{
        if(authorization.startsWith(process.env.BEARER)){
            let token = authorization.split(process.env.BEARER)[1]
            let decoded = await jwt.verify(token, process.env.SECRET)
            req.id = decoded.id
            next()
            // return res.json({decoded})
        }else{
            return res.json({message:"invalid token"})
        }
    }


}
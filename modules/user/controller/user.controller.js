import userModel from "../../../DB/models/user.model.js"
import { changePassSchema, updateSchema } from "../user.validation.js"
import bcrypt from 'bcryptjs'
/**
 * user info
 * update
 * delete account
 */
export const getUser = async(req,res)=>{
    let preuser = await userModel.findById(req.id)
    if(!preuser){
        return res.status(404).json({message:"User is not found"})
    }
    const user = await userModel.findById(req.id).select(['-_id','name', 'email'])
    return res.status(200).json({message:"users", user})
}
export const deleteUser = async(req,res)=>{
    await userModel.findByIdAndDelete(req.id)
    let user = await userModel.findById(req.id)
    if(!user){
        return res.status(404).json({message:"User is not found"})
    }
    return res.status(200).json({message:"Account deleted successfully"})
}

export const updateUser =async (req, res)=>{
    let {name, email} = req.body
    let validator = updateSchema.validate(req.body)
    let {value, error} = validator
    let isValid = error == null
    if(!isValid){
        return res.json({message:"validation error", error})
    }
    let user = await userModel.findById(req.id)
    if(!user){
        return res.status(404).json({message:"User is not found"})
    }
    let newUser = await userModel.findByIdAndUpdate(req.id, {name, email}, {new:true})
    return res.status(200).json({message:"Account updated successfully", newUser})
}

export const changePassword =async (req, res)=>{
    let {currentPassword, newPassword} = req.body
    let validator = changePassSchema.validate(req.body)
    let {value, error} = validator
    let isValid = error == null
    if(!isValid){
        return res.json({message:"validation error", error})
    }
    if(currentPassword == newPassword){
        return res.status(401).json({message:"Curent password is equal to new password"})
    }
    let user = await userModel.findById(req.id)
    if(!user){
        return res.status(404).json({message:"User is not found"})
    }else{
        let isMatch = await bcrypt.compare(currentPassword, user.password)
        if(!isMatch){
            return res.status(401).json({message:"Invalid current password"})
        }else{
            let newHash = bcrypt.hashSync(newPassword, parseInt(process.env.SALT))
            await userModel.updateOne({_id:user.id}, {$set:{password:newHash}})
            return res.status(200).json({message:"password updated successfully"})
        }
    }
}


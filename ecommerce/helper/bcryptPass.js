
// this is for password bcrypt and send to the authController
import bcrypt from "bcrypt";


export const hashedPassword=async (password)=>{
   const saltRound=10;
   const hashedPassword=await bcrypt.hash(password,saltRound)
   return hashedPassword
} 

export const comparePassword=async(password,hashPassword)=>{
   try {
      return await bcrypt.compare(password,hashPassword)
   } catch (error) 
   {
      console.log(error)
   }
}
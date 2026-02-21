import { connectDB } from "@/lib/connectDatabase";
import { response } from "@/lib/helper";
import { zSchema } from "@/lib/zodValidation";
import { userModel } from "@/models/user.model";

export async function POST (request){
    try {
        await connectDB();
        
        // for validation in backend
        const validationSchema = zSchema.pick({
            name: true, email: true, password: true
        })

        // to get the payload means the data
        const payload = await request.json()

        // now the the geted value has applied the zod schema
        const validatedData = validationSchema.safeParse(payload);
        
        if(!validatedData){
            return response(false, 401, "Invalid email or password!", validatedData.error)
        }

        const {name, email, password} = validatedData.data

        const userExists = await userModel.exists({ email });

        // checking user already exists or not?
        if(userExists){
            return response (false, 401, "User already exists!")
        }

        // createing registration of an user
        const NewRegistration = new userModel({
            name, email, password
        })

        await NewRegistration.save()
        

    } catch (error) {
        
    }
}
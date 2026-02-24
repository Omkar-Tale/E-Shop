import { connectDB } from "@/lib/connectDatabase";
import { emailVerificationLink } from "@/lib/EmailVerificationLink";
import { catchError, response } from "@/lib/helper";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodValidation";
import { userModel } from "@/models/user.model.js";
import { SignJWT } from "jose";
export async function POST (request){
    try {
        await connectDB();
        
        // for validation in backend
        const validationSchema = zSchema.pick({
            name: true, email: true, password: true
        })

        // to get the payload means the data
        const payload = await request.json();

        // now the the geted value has applied the zod schema
        const validatedData = validationSchema.safeParse(payload);
        
        if(!validatedData.success){
            return response(false, 401, "Invalid email or password!", validatedData.error)
        }

        const {name, email, password} = validatedData.data;

        const userExists = await userModel.exists({ email });

        // checking user already exists or not?
        if(userExists){
            return response (false, 401, "User already exists!")
        }

        // createing registration of an user
        const NewRegistration = new userModel({
            name, email, password
        })

        await NewRegistration.save();

        const secret = new TextEncoder().encode(process.env.SECRET_KEY);

        const userToken = await new SignJWT({userId: NewRegistration._id})
        .setProtectedHeader({alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(secret)
        
        await sendMail("Email Verification Request", email, emailVerificationLink(`${process.env.NEXT_PUBLIC_URL}/auth/verify-email/${userToken}`))

        return response(true, 200, "User Registred Successfully!");

    } catch (error) {
        return catchError(error)
    }
}
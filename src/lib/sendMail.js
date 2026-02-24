import nodemailer from "nodemailer"

export const sendMail = async (subject, receiver, body)=>{
    const transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: process.env.NODEMAILER_PORT,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD
        }
    });

    const options = {
        from: `"Clothing Store" : <${process.env.NODEMAILER_EMAIL}>`,
        to: receiver,
        subject: subject,
        html: body
    }

    try {
        await transporter.sendMail(options)
        return {sucess: true}
    } catch (error) {
        console.error("Email error:", error);
        return {sucess: false}
    }

}
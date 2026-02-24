import { NextResponse } from "next/server";

export const response = (success, statusCode, message, data={})=>{
    return NextResponse.json({
        success, statusCode, message, data
    })
}

export const catchError = (error, customError)=> {
    if(error.code === 110000){
        const keys = Object.keys(error.pattern).join(",")
        error.message = `Duplicate failed: ${keys}`
    }

    let errorObj = {}

    if(process.env.NODE_ENV === "development"){
        errorObj = {
            message: error.message,
            error
        }
    }else{
        errorObj = {
            message: customError || "Internal Server Error ",
            error
        }
    }

    return response(
        false,
        error.code || 500,
        errorObj.message,
        errorObj.error
    );
}
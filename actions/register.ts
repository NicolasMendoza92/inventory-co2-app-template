"use server";

import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs"
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/services/mail";

export const register = async (values:z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success){
        return {error: "Invalid fields!"}
    }

    const {name, email, password} = validatedFields.data;
    const hashpassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if(existingUser){
        return { error: "User already created"}
    };

    await db.user.create({
        data:{
           name, 
           email,
           password: hashpassword, 
        }
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
    )

    return {success: "User Created!, Confirmation email sent"}
}
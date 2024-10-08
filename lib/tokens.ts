import { getVerificationTokenByEmail } from "@/data/verification-token";
import { db } from "./db";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

// TOKEN PARA EL 2FA 
export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    // Seteo el tiempo que va a tener este token
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

    const existingToken = await getTwoFactorTokenByEmail(email);

    if(existingToken){
        await db.twoFactorToken.delete({
            where:{
                id: existingToken.id
            }
        });
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return twoFactorToken;
}

// VERIFICATION TOKEN TO VERIFIED EMAIL
export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

    // chequeamos si tenemos un token existente ya enviado para este email que se esta logeando 
    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    };

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    });

    return verificationToken;
}

// TOKEN PARA REINICIAR PASSWORD
export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    // chequeamos si tenemos un token existente ya enviado para este email que se esta logeando 
    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
        await db.passwordResetToken.delete({
            where: {
                id: existingToken.id
            }
        })
    };

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    });

    return passwordResetToken;
}
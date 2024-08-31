import nodemailer from "nodemailer";
import { google } from "googleapis";


const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID_GOOGLE,
    process.env.CLIENT_SECRET_GOOGLE,
    process.env.REDIRECT_URI,
  );
  
  oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN_OAUTH });
  
  // Obtengo el acces token configurado en google OAUTH
  export const getAccessToken = async () => {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
      if (!accessToken) {
        throw new Error("Unable to acquire access token.");
      }
      return accessToken;
    } catch (error) {
      console.error("Error acquiring access token", error);
      throw error;
    }
  };
  
  // Función para crear el transporter de libreria nodemailer
  export const createTransporter = async () => {
    const accessToken = await getAccessToken();
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "nmapi2022@gmail.com",
        clientId: process.env.CLIENT_ID_GOOGLE,
        clientSecret: process.env.CLIENT_SECRET_GOOGLE,
        refreshToken: process.env.REFRESH_TOKEN_OAUTH,
        accessToken: accessToken as string,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });
  
    return transporter;
  };
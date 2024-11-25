import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configura el transportador de Nodemailer para Gmail
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587, // Puerto de Gmail con STARTTLS
      secure: false, // Usa TLS
      auth: {
        user: process.env.GMAIL, // Tu correo electrónico
        pass: process.env.GMAIL_PASSWORD, // Contraseña de aplicación de Gmail
      },
    });
  }

  // Método para enviar correos
  async sendMail(to: string, subject: string, text: string, html?: string) {
    try {
      const info = await this.transporter.sendMail({
        from: `"SICAT" <${process.env.GMAIL}>`, // Cambia por tu nombre y correo
        to,
        subject,
        text,
        html, // Mensaje en HTML opcional
      });

      console.log('Correo enviado:', info.messageId);
      return info;
    } catch (error) {
      console.error('Error enviando correo:', error);
      throw error;
    }
  }
}

import express from "express";
import nodemailer from 'nodemailer';
import { prisma } from './prisma';

export const routes = express.Router();

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3c6149fd661c40",
    pass: "2f5ca846c152af"
  }
});

routes.post('/feedbacks', async (req, res) => {

  const { type, comment, screanshot } = req.body
  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screanshot,
    }
  })

  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Mizael Fernando <mizaellmagumba@gmail.com',
    subject: "Novo Feedback",
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;" >`,
      `<p>Tipo de Feedback: ${type}</p>`,
      `<p>Comentário: ${comment} </p>`,
      `</div>`,
    ].join('\n')
  })

  return res.status(201).json({data: feedback})
});
import express from "express";
import nodemailer from 'nodemailer';

import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { FeedbackUseCase } from "./use-cases/submit-feedbacks-use-case";

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
 
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const feedbackUseCase = new FeedbackUseCase(prismaFeedbacksRepository);

  await feedbackUseCase.execute({
    type,
    comment,
    screanshot,
  })

// await transport.sendMail({
//   from: 'Equipe Feedget <oi@feedget.com>',
//   to: 'Mizael Fernando <mizaellmagumba@gmail.com',
//   subject: "Novo Feedback",
//   html: [
//     `<div style="font-family: sans-serif; font-size: 16px; color: #111;" >`,
//     `<p>Tipo de Feedback: ${type}</p>`,
//     `<p>Comentário: ${comment} </p>`,
//     `</div>`,
//   ].join('\n')
// })

  return res.status(201).send();
});
import express from "express";
import nodemailer from 'nodemailer';
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";

import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { FeedbackUseCase } from "./use-cases/submit-feedbacks-use-case";

export const routes = express.Router();


routes.post('/feedbacks', async (req, res) => {

  const { type, comment, screanshot } = req.body

  try {
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter()


    const feedbackUseCase = new FeedbackUseCase(
      prismaFeedbacksRepository,
      nodemailerMailAdapter
    );

    await feedbackUseCase.execute({
      type,
      comment,
      screanshot,
    });

    return res.status(201).send();
  } catch (error) {
    
    return res.status(500).send();
  }
});
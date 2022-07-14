import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbackRepository } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbackRepository {
 async create({ type, comment, screanshot}: FeedbackCreateData) {
  await  prisma.feedback.create({
        data: {
          type,
          comment,
          screanshot,
        }
    })
  };
}
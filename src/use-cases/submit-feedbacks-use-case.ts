import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbackRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screanshot?: string;
}



export class FeedbackUseCase {

  constructor(
    private feedbacksRepository: FeedbackRepository,
    private mailAdapter: MailAdapter
    ){}
  async execute(request: SubmitFeedbackUseCaseRequest) {
     const {type, comment, screanshot} = request;

     await this.feedbacksRepository.create({
      type,
      comment,
      screanshot,
     })

     await this.mailAdapter.sendMail({
      subject: "Novo Feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;" >`,
        `<p>Tipo de Feedback: ${type}</p>`,
        `<p>Comentário: ${comment} </p>`,
        `</div>`,
      ].join('\n')
     })

  }
}
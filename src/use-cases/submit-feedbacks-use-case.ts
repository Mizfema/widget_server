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

     if (!type) {
      throw new Error('type is required')
     }

     if (!comment) {
      throw new Error('comment is required')
     }

     if(screanshot && !screanshot.startsWith('data:image/png;base64')){
      throw new Error('Invalid screenshot format.')
     }

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
        screanshot ? `<img src = "${screanshot}"/>`: null,
        `</div>`,
      ].join('\n')
     })

  }
}
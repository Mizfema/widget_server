import { FeedbackRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screanshot?: string;
}



export class FeedbackUseCase {

  constructor(private feedbacksRepository: FeedbackRepository){}
  async execute(request: SubmitFeedbackUseCaseRequest) {
     const {type, comment, screanshot} = request;

     await this.feedbacksRepository.create({
      type,
      comment,
      screanshot,
     })

  }
}
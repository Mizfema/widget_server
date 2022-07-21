import { FeedbackUseCase } from "./submit-feedbacks-use-case";

const submitFeedback = new FeedbackUseCase(
  {create: async () => {}},
  {sendMail: async () => {}}
)


describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {   
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screanshot: "data:image/png;base64"
    })).resolves.not.toThrow()
  });

  it('should not be able to submit a feedback without type', async () => {   
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screanshot: "data:image/png;base64"
    })).rejects.toThrow()
  });

  it('should not be able to submit a feedback without comment', async () => {   
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screanshot: "data:image/png;base64"
    })).rejects.toThrow()
  });

  it('should not be able to submit a feedback with an invalid screenshot', async () => {   
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'esta tudo bugado',
      screanshot: "image/png"
    })).rejects.toThrow()
  });

});
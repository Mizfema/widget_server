export interface FeedbackCreateData {
  type: string;
  comment: string;
  screanshot?: string;
}

export interface FeedbackRepository {
  create: (data: FeedbackCreateData) => Promise<void>
}
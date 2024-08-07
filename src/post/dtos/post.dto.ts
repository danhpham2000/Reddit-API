export class CreatePostDto {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  upVote: number;
  authorId: number;
  subbredditId: number;
  subbreddit: string;
}

export class CreateSubbredditDto {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
}

export class UpdateSubbredditDto {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
}

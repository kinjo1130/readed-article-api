import { Timestamp } from 'firebase-admin/firestore';

export type ResponseDto = {
  success: boolean;
  statusCode: number;
  message: string;
  data: ResponseDataDto[] | null | any;
};

export type ResponseDataDto = {
  link: string;
  createdAt: Timestamp;
};

import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { AddArticleDto } from './dto/requestAdd.dto';
import { ResponseDataDto, ResponseDto } from './dto/response.dto';
@Injectable()
export class ArticlesService {
  addArticle(data: AddArticleDto): Promise<ResponseDto> {
    // ここでFirebaseとの疎通確認を行いたい
    return admin
      .firestore()
      .collection('articles')
      .add({
        link: data.articleLink,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
        return docRef.get().then((docSnapshot) => {
          // docSnapshotはDocumentSnapshotオブジェクト
          if (docSnapshot.exists) {
            console.log(docSnapshot.data());
            return {
              success: true,
              message: 'success',
              statusCode: 200,
              data: docSnapshot.data() as ResponseDataDto,
            };
          } else {
            console.log('Document does not exist!');
            return {
              success: false,
              message: 'Error',
              statusCode: 500,
              data: null,
            };
          }
        });
      })
      .catch(this.handleError);
  }
  getArticleLists(data?: string): Promise<ResponseDto> {
    if (data) {
      // クエリが存在する場合
      const year = Number(data.split('-')[0]);
      const month = Number(data.split('-')[1]);
      const startAt = new Date(year, month - 1, 1);
      const endAt = new Date(year, month, 0);

      return admin
        .firestore()
        .collection('articles')
        .where('createdAt', '>=', startAt)
        .where('createdAt', '<=', endAt)
        .get()
        .then((querySnapshot) => this.createResponse(querySnapshot))
        .catch(this.handleError);
    } else {
      // クエリが存在しない場合、すべてのドキュメントを取得
      return admin
        .firestore()
        .collection('articles')
        .get()
        .then((querySnapshot) => this.createResponse(querySnapshot))
        .catch(this.handleError);
    }
  }

  createResponse(querySnapshot): ResponseDto {
    const data: ResponseDataDto[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data() as ResponseDataDto);
    });
    return {
      success: true,
      message: 'success',
      statusCode: 200,
      data: data,
    };
  }

  handleError(err): ResponseDto {
    console.log(err);
    return {
      success: false,
      message: 'Error',
      statusCode: 500,
      data: null,
    };
  }
}

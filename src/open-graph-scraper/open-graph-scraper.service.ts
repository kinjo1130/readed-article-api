/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
const ogs = require('open-graph-scraper');

@Injectable()
export class OpenGraphScraperService {
  async getOpenGraphData(url: string) {
    const options = { url: url };
    try {
      const data = await ogs(options);
      console.log(data);
      const { error, html, result, response } = data;
      console.log('error:', error); // This returns true or false. True if there was an error. The error itself is inside the result object.
      console.log('html:', html); // This contains the HTML of page
      console.log('result:', result); // This contains all of the Open Graph results
      console.log('response:', response);
      // ここで必要なデータを処理
      return result;
    } catch (err) {
      throw new Error('Open Graph data fetch failed: ' + err.message);
    }
  }
}

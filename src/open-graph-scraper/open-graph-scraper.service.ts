/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
const ogs = require('open-graph-scraper');

@Injectable()
export class OpenGraphScraperService {
  async getOpenGraphData(url: string) {
    const options = { url: url };
    try {
      const data = await ogs(options);

      const { result } = data;

      // ここで必要なデータを処理
      return result;
    } catch (err) {
      throw new Error('Open Graph data fetch failed: ' + err.message);
    }
  }
}

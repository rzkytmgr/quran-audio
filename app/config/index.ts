import { IConfig } from '@/interface';
import dotenv from 'dotenv';
dotenv.config({});

export const config: IConfig = {
  host: process.env.APP_HOST || 'localhost',
  port: process.env.APP_PORT || 5000,
  title: 'Recitater - Recitation Cutter',
  documentation: 'https://github.com/rzkytmgr/quran-recitation-cutter',
  repository: 'https://github.com/rzkytmgr/quran-recitation-cutter',
  author: {
    fullname: 'Rizky Aulia Tumangger',
    link: 'https://github.com/rzkytmgr',
    username: 'rzkytmgr',
  },
};

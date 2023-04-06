import cors from 'cors';
import path from 'path';
import fs from 'node:fs';
import morgan from 'morgan';
import matter from 'gray-matter';
import { Routes } from '@/routes';
import MarkdownIt from 'markdown-it';
import express, { Request, Response } from 'express';

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use('/static', express.static(path.join(process.cwd(), 'public')));
app.use('/api', Routes);

// pages routes auto register
const pages = fs.readdirSync(path.join(process.cwd(), 'pages'));
const pagesMeta = pages.map((page) => matter(fs.readFileSync(path.join(process.cwd(), 'pages', page))));

for (const page of pagesMeta) {
  const controller = (req: Request, res: Response) => {
    return res.status(200).send(MarkdownIt({
      html: true,
    }).render(page.content));
  };

  if (page.data.method === 'GET') {
    app.get(page.data.path, controller);
  }
}

app.all('*', (req: Request, res: Response) => {
  return res.status(404).send('Not Found');
});

app.listen(3001, () => {
  console.log('Running! http://localhost:3001');
});
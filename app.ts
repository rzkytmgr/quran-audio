import Express from 'express';
import path from 'path';
import { config } from '@/config';
import { router as apiRoutes } from '@/api';
import { routes as pageRoutes } from '@/pages';

const app = Express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));

app.use('/static', Express.static(path.join(__dirname, 'app', 'public')));
app.use('/api', apiRoutes);
app.use('/', pageRoutes);

app.listen(config.port, () => {
  console.clear();
  console.log(`[⚡] Server is running on http://${config.host}:${config.port}`);
});

import express from 'express';

import articles from './controllers/articles'

const app = express();
const port = process.env.PORT || 4000;

app.get('/test', articles.list);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;

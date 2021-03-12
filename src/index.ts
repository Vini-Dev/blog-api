import dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import { json } from 'body-parser'
import routes from './routes'
import mongodb from './database/mongodb'

const app = express();
app.use(json())
app.use(routes)

// Connect DB
mongodb()

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;

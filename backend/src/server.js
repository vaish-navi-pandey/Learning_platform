import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import courseRouter from './routers/course.router.js';
import userRouter from './routers/user.router.js';
import enrollmentRouter from './routers/enrollment.router.js';
import uploadRouter from './routers/upload.router.js';
import { dbconnect } from './config/database.config.js';
dbconnect();

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  })
)

app.use('/api/courses', courseRouter);
app.use('/api/users', userRouter);
app.use('/api/enroll', enrollmentRouter);
app.use('/api/upload', uploadRouter);

const PORT = 5002;
app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
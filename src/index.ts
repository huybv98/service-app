import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/configSwagger';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// connect database
mongoose.connect(process.env.MONGODB_URI!);

// use swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

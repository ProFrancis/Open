import express from 'express'
import cors from "cors"

// ROUTES
import Chat from './routes/chat.router.js'


// APP EXPRESS
const app = express();

// MIDDLEWARES
app.use(express.json())
app.use(cors())

// URLS API PREFIX
app.use("/api/chat", Chat);

export default app;
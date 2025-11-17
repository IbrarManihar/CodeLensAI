
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes/ai.routes.js';
const app = express();

 app.use(express.json());
dotenv.config();
app.use(cors());

 app.use('/ai',router);

app.get('/',(req,res)=>{
     res.send("Hello World");
})


const PORT = process.env.PORT || 4001;
    app.listen(PORT, () => {
        const url = `http://localhost:${PORT}`;
        console.log(`Server is running in on port :${url}`);
 })
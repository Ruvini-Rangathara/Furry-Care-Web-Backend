import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserRoute from "./routes/user-route";
import DonationRoute from "./routes/donation-route";
import EventRoute from "./routes/event-route";
import ComplaintRoute from "./routes/complaint-route";
import PetRoute from "./routes/pet-route";
import VetRoute from "./routes/vet-route";
import Router from "./controller/test-images";
import OrgRoute from "./routes/org-route";
import LostNoticeRoute from "./routes/lost-notice-route";
import QuestionRoute from "./routes/question-route";

const app = express();

const port = 3000;
const host = 'localhost';


app.use(cors());
app.use(express.json());

// const uri = process.env.MONGO_URL as string;

const url = 'mongodb://localhost:27017/furrycaredb1';

mongoose.connect(url, {})
    .then(r => {
    console.log("DB Connected Successfully")
    }).catch(err => {
    console.log("DB Connection Error: ", err)
    }
)

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})

// mongoose.connect(process.env.MONGO_URL as string).then(r => {
//     console.log("DB Connected Successfully")
//
// })
// const db = mongoose.connection
//
// db.on('error', (error) => {
//     console.log("DB Connection Error: ", error)
// })
//
// db.on('open', () => {
//     console.log("DB Connected Successfully")
// })

app.use('/api/user', UserRoute);
app.use('/api/donation', DonationRoute);
app.use('/api/event', EventRoute);
app.use('/api/complaint', ComplaintRoute);
app.use('/api/pet', PetRoute);
app.use('/api/vet', VetRoute);
app.use('/api/org', OrgRoute);
app.use('/api/lost', LostNoticeRoute);
app.use('/api/question', QuestionRoute);

app.use('/upload/images', Router);
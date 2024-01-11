import mongoose from "mongoose";

const Schema = mongoose.Schema;

const donationSchema = new Schema({
    id: String,
    description: String,
    location: String,
    date: Date,
    receiver: String,
    donor: String,
    username: String,
});

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
import express from "express"
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Contact from "../models/Contact.js";
import cors from "cors";

dotenv.config();

const app = express.Router();

app.post('/contact', async (req, res) => {
    try {
        const { name, email,subject, message } = req.body;

        const exist = await Contact.findOne({ email, subject, message });
        if (exist) {
            return res.send({ success: false, error: 'You have already contacted us with the same query.' });
        }

        const result = await Contact.create({ name, email, subject, message });

        // nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Zoise',
            html: `
                <h2>Welcome to Zoise</h2>
                <p>Hello ${name},</p>
                <p>Thank you for contacting our consultancy. We are excited to have you on board!</p>
                <p>Best regards,</p>
                <p>Team Zoise</p>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

        res.json({ success: true, message: 'Thanks for contacting' });
        console.log(result);

    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).send('Internal server error occurred');
    }
});

app.get('/contact-details', async (req, res) => {
    try {
        const contactDetails = await Contact.find();
        res.json({ success: true, AdminInfo: contactDetails });
    }
    catch (error) {
        res.json({ success: false, error: 'Failed to retrieve details' });
    }
})

export default app;
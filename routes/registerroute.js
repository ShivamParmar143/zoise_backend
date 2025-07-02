import express from "express"
import nodemailer from 'nodemailer';
import Register from "../models/Register.js";
import bcrypt from 'bcrypt';




const app = express.Router();

app.post('/register', async (req, res) => {

    const { name, email, mobile, password } = req.body;

    try {

        console.log('User Registration Data:', { name, email, mobile, password });

        const existingUser = await Register.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, error: 'Email already registered, please do login' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);





        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });



        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Hunter Esports',
            html: " <p> Hello " + req.body.name + " , </p> " +
                " <p>Thank you for registering with Zoise. We are excited to have you on board!</p> " +
                "<hr>" +
                "<p>Best regards,</p>" +
                "<p>Team Zoise</p> "
            ,
        };



        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);



        const result = await Register.create({ name, email, mobile, password: hashedPassword });

        res.json({ success: true, message: 'sent' })

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
    }



});

app.get('/register-details', async (req, res) => {
    try {
        const registerDetails = await Register.find();
        res.json({ success: true, AdminInfo: registerDetails });
    }
    catch (error) {
        res.json({ success: false, error: 'Failed to retrieve details' });
    }
})

export default app;
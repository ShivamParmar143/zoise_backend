import express from "express"
import Register from "../models/Register.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';



const app = express.Router();



app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    console.log('User Login:', { email, password });

    try {
        const user = await Register.findOne({ email });

        if (!user) {
            return res.json({ success: false, error: 'Invalid email' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.json({ success: false, error: 'Invalid  password' });
        }


        const token = jwt.sign({ email }, 'secret-key', { expiresIn: '10h' });

        console.log(token)
        console.log(user.name)



        res.json({ success: true, message: "Thanks for login", data: token });
    } catch (error) {
        console.error('Error during login:', error);
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: process.env.EMAIL_USER,
    //         pass: process.env.EMAIL_PASS,
    //     },
    // });



    // const mailOptions = {
    //     from: process.env.EMAIL_USER,
    //     to: email,
    //     subject: 'Welcome to Hunter Esports',
    //     html: " <p> Hello </p> " +
    //         " <p>Successfully logged in Hunter Esports.</p> " +
    //         "<hr>" +
    //         "<p>Best regards,</p>" +
    //         "<p>Hunter Esp. Team</p> "
    //     ,
    // };



    // const info = await transporter.sendMail(mailOptions);
    // console.log('Email sent:', info.response);



    // const result = await Login.create({  email, password : hashedPassword });

    // res.json({ success: true, message: 'sent' })

});

app.get('/login-details', async (req, res) => {
    try {
        const loginDetails = await Login.find();
        res.json({ success: true, AdminInfo: loginDetails });
    }
    catch (error) {
        res.json({ success: false, error: 'Failed to retrieve details' });
    }
})

export default app;
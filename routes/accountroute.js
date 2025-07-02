import express from "express"
import Register from "../models/Register.js";
import jwt from 'jsonwebtoken';

const app = express.Router();

app.get('/account-details', async (req, res) => {
    try {

        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Token not provided' });
        }


        let decoded;
        try {
            decoded = jwt.verify(token, 'secret-key');
        } catch (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }


        const user = await Register.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }


        const accountInfo = {
            name: user.name,
            email: user.email,
            mobile: user.mobile,
        };

        return res.json({ accountInfo });
    } catch (error) {
        console.error('Error fetching account details:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default app;
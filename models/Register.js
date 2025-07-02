import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: Number, required: true },
  password: { type: String, required: true },
});

const Register = mongoose.model('Register', registerSchema);
export default Register;
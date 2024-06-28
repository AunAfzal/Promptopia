/*import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Remove leading/trailing whitespace
    minlength: 3, // Enforce minimum username length
    maxlength: 20, // Enforce maximum username length
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Remove leading/trailing whitespace
    lowercase: true, // Convert email to lowercase for consistency
    validate: {
      validator: (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Enforce minimum password length for security
    select: false, // Exclude password from user data retrieved on default
  },
});

userSchema.pre('save', async function (next) {
  // Hash password using a secure algorithm like bcrypt before saving
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
*/
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAuthModel extends Document {
  id: number;
  name: string;
  email: string;
  password: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword(candidatePassword: string): boolean;
}

const authSchema = new Schema({
  id: { 
    type: Number, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  role: {
    type: String, 
    enum: ['user', 'admin'],
    default: 'user' 
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc: any, ret: any) {
      delete ret.password;
      delete ret.__v;
      delete ret._id;
      return ret;
    }
  },
  toObject: {
    transform: function(doc: any, ret: any) {
      delete ret.password;
      delete ret.__v;
      delete ret._id;
      return ret;
    }
  }
});

// Pre-save middleware to hash password
authSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Pre-update middleware to hash password on updates
authSchema.pre(['findOneAndUpdate', 'updateOne'], async function(next) {
  const update = this.getUpdate() as any;
  
  if (update.password) {
    try {
      const hashedPassword = await bcrypt.hash(update.password, 12);
      update.password = hashedPassword;
    } catch (error) {
      return next(error as Error);
    }
  }
  
  next();
});

// Instance method to compare password
authSchema.methods.comparePassword = function(candidatePassword: string): boolean {
  return bcrypt.compareSync(candidatePassword, this.password);
};

export const AuthModel = model<IAuthModel>("Auth", authSchema);
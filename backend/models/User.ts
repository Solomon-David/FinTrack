import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './interfaces';
import { hashPassword, comparePassword } from '../config/bcryptjs';

const UserSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    nickname: {
      type: String,
      trim: true,
      default: function (this: IUser) {
        if (this.firstName && this.lastName) {
          return `${this.firstName} ${this.lastName}`;
        }
        return undefined;
      },
    },
    photoData: {
      type: String, 
      trim: true,
    },
    dob: {
      type: Date,
    },
    lastSeen: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
    preferredCurrency: {
      type: String,
      required: true,
    },
    preferredTheme: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
      contacts: [ 
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        phone: {
          type: String,
          trim: true,
        },
      },
      ],
    verified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Pre-save hook to hash password if modified
UserSchema.pre<IUser>('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await hashPassword(this.password);
  }
  next();
});

// Instance method to compare password
UserSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
  return comparePassword(password, this.password);
};

// Instance method to change password
UserSchema.methods.changePassword = async function(oldPassword: string, newPassword: string): Promise<void> {
  const isMatch = await this.comparePassword(oldPassword);
  if (!isMatch) {
    throw new Error('Old password is incorrect');
  }
  this.password = newPassword;
  await this.save();
};


const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;


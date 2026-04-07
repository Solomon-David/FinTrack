import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUserModel } from '../interfaces';
import { hashPassword, comparePassword } from '../config/bcryptjs';

const UserSchema: Schema<IUserModel> = new Schema(
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
      default: function (this: IUserModel) {
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
    preferredCurrency: {
      type: String,
    },
    preferredTheme: {
      type: String,
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
    verificationCodeExpires: Number,
    lastSeen: Date,
    passwordResetCode: {
      type: String,
      trim: true,
    },
    passwordResetCodeExpires: Number,
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Pre-save hook to hash password if modified
UserSchema.pre<IUserModel>('save', async function(next) {
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


const User: Model<IUserModel> = mongoose.models.User || mongoose.model<IUserModel>('User', UserSchema);

export default User;


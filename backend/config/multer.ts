import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary';

// Configure Cloudinary (ensure this matches your .env keys)

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'user_profiles',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
      transformation: [{ width: 400, height: 400, crop: 'fill', gravity: 'face' }]
    };
  },
});

export const upload = multer({ storage });
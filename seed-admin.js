import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/userModel.js';

dotenv.config();

const MONGODB_URI = 'mongodb+srv://Lily250:Lily250@lily250.ade7kfq.mongodb.net/';

const adminUser = {
  username: 'admin',
  email: 'admin@cts.com',
  password: 'admin123',
  role: 'admin',
  isActive: true
};

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminUser.email.toLowerCase() });
    
    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists');
    } else {
      const user = new User(adminUser);
      await user.save();
      console.log('✅ Admin user created successfully');
      console.log('   Email: admin@cts.com');
      console.log('   Password: admin123');
      console.log('   Role: admin');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedAdmin();
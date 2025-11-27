import mongoose from 'mongoose';
import User from './models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing users
    await User.deleteMany({});
    console.log('🗑️  Existing users cleared');

    // Create default admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });

    // Create default member user
    const memberUser = await User.create({
      name: 'Member User',
      email: 'member@example.com',
      password: 'member123',
      role: 'member'
    });

    console.log('✅ Default users created:');
    console.log('👨‍💼 Admin - Email: admin@example.com, Password: admin123');
    console.log('👤 Member - Email: member@example.com, Password: member123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
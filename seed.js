import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/inventory_db';

// Define schema (copied from model for standalone seeding)
const inventorySchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true, trim: true },
  productName: { type: String, required: true, trim: true },
  category: { type: String, trim: true },
  quantity: { type: Number, required: true, min: 0 },
  unitPrice: { type: Number, required: true, min: 0 },
  totalValue: { type: Number, required: true, min: 0 },
  date: { type: String, required: true },
  supplierName: { type: String, trim: true },
  customerName: { type: String, trim: true },
  recordedBy: { type: String, required: true, trim: true },
  status: { type: String, enum: ['Active', 'Discontinued', 'Out of Stock'], default: 'Active' },
  location: { type: String, trim: true },
  notes: { type: String, trim: true }
}, { timestamps: true });

const Inventory = mongoose.model('Inventory', inventorySchema);

// Sample data
const sampleData = [
  {
    productId: 'PROD-001',
    productName: 'Wireless Mouse',
    category: 'Electronics',
    quantity: 150,
    unitPrice: 29.99,
    totalValue: 4498.50,
    date: '2026-03-15',
    supplierName: 'TechSupply Co.',
    customerName: 'General Stock',
    recordedBy: 'John Doe',
    status: 'Active',
    location: 'Warehouse A-12',
    notes: 'Popular item, fast moving'
  },
  {
    productId: 'PROD-002',
    productName: 'USB-C Cable',
    category: 'Accessories',
    quantity: 300,
    unitPrice: 9.99,
    totalValue: 2997.00,
    date: '2026-03-14',
    supplierName: 'Cable Masters Inc.',
    customerName: 'General Stock',
    recordedBy: 'Jane Smith',
    status: 'Active',
    location: 'Warehouse B-05',
    notes: 'High demand product'
  },
  {
    productId: 'PROD-003',
    productName: 'Mechanical Keyboard',
    category: 'Electronics',
    quantity: 75,
    unitPrice: 89.99,
    totalValue: 6749.25,
    date: '2026-03-10',
    supplierName: 'KeyTech Solutions',
    customerName: 'General Stock',
    recordedBy: 'John Doe',
    status: 'Active',
    location: 'Warehouse A-15',
    notes: 'Premium product line'
  },
  {
    productId: 'PROD-004',
    productName: 'Laptop Stand',
    category: 'Accessories',
    quantity: 45,
    unitPrice: 39.99,
    totalValue: 1799.55,
    date: '2026-03-12',
    supplierName: 'Office Essentials Ltd.',
    customerName: 'General Stock',
    recordedBy: 'Sarah Johnson',
    status: 'Active',
    location: 'Warehouse B-08',
    notes: 'Ergonomic design'
  },
  {
    productId: 'PROD-005',
    productName: 'HDMI Cable 2m',
    category: 'Accessories',
    quantity: 200,
    unitPrice: 12.99,
    totalValue: 2598.00,
    date: '2026-03-11',
    supplierName: 'Cable Masters Inc.',
    customerName: 'General Stock',
    recordedBy: 'Mike Wilson',
    status: 'Active',
    location: 'Warehouse B-05',
    notes: '4K compatible'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Inventory.deleteMany({});
    console.log('✅ Existing data cleared');

    // Insert sample data
    console.log('📥 Inserting sample data...');
    await Inventory.insertMany(sampleData);
    console.log('✅ Sample data inserted successfully');

    // Display summary
    const count = await Inventory.countDocuments();
    console.log(`\n📊 Database seeded with ${count} items`);

    // Close connection
    await mongoose.connection.close();
    console.log('👋 Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

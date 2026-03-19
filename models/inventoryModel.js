import mongoose from 'mongoose';

// Define the Inventory Schema
const inventorySchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  productName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0
  },
  totalValue: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: String,
    required: true
  },
  supplierName: {
    type: String,
    trim: true
  },
  customerName: {
    type: String,
    trim: true
  },
  recordedBy: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['Active', 'Discontinued', 'Out of Stock'],
    default: 'Active'
  },
  location: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id.toString();
      ret.lastModified = ret.updatedAt;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Create indexes for better query performance
inventorySchema.index({ category: 1 });
inventorySchema.index({ status: 1 });
inventorySchema.index({ productId: 1 });

// Pre-save middleware to calculate totalValue
inventorySchema.pre('save', function(next) {
  this.totalValue = this.quantity * this.unitPrice;
  next();
});

// Create and export the model
const Inventory = mongoose.model('Inventory', inventorySchema);

export const InventoryModel = {
  // Get all items
  getAll: async () => {
    return await Inventory.find({}).sort({ createdAt: -1 });
  },

  // Get item by ID
  getById: async (id) => {
    try {
      return await Inventory.findById(id);
    } catch (error) {
      return null;
    }
  },

  // Get items by category
  getByCategory: async (category) => {
    return await Inventory.find({ 
      category: { $regex: new RegExp(`^${category}$`, 'i') }
    });
  },

  // Create new item
  create: async (itemData) => {
    const totalValue = itemData.quantity * itemData.unitPrice;
    const item = new Inventory({
      ...itemData,
      totalValue,
      date: itemData.date || new Date().toISOString().split('T')[0]
    });
    return await item.save();
  },

  // Update item
  update: async (id, itemData) => {
    try {
      const totalValue = itemData.quantity * itemData.unitPrice;
      const updatedItem = await Inventory.findByIdAndUpdate(
        id,
        { 
          ...itemData,
          totalValue 
        },
        { new: true, runValidators: true }
      );
      return updatedItem;
    } catch (error) {
      return null;
    }
  },

  // Delete item
  delete: async (id) => {
    try {
      const result = await Inventory.findByIdAndDelete(id);
      return result !== null;
    } catch (error) {
      return false;
    }
  },

  // Get statistics
  getStats: async () => {
    const items = await Inventory.find({});
    const totalItems = items.length;
    const totalValue = items.reduce((sum, item) => sum + item.totalValue, 0);
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      totalItems,
      totalValue,
      totalQuantity
    };
  }
};

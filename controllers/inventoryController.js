import { InventoryModel } from '../models/inventoryModel.js';

export const inventoryController = {
  // GET /api/inventory - Get all items 
  getAllItems: async (req, res) => { 
    try {
      const items = await InventoryModel.getAll();
      res.json({
        success: true,
        data: items,
        message: 'Items retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve items',
        error: error.message
      });
    }
  },

  // GET /api/inventory/:id - Get single item
  getItemById: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await InventoryModel.getById(id);
      
      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Item not found'
        });
      }

      res.json({
        success: true,
        data: item,
        message: 'Item retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve item',
        error: error.message
      });
    }
  },

  // GET /api/inventory/category/:category - Get items by category
  getItemsByCategory: async (req, res) => {
    try {
      const { category } = req.params;
      const items = await InventoryModel.getByCategory(category);
      
      res.json({
        success: true,
        data: items,
        message: 'Items retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve items',
        error: error.message
      });
    }
  },

  // POST /api/inventory - Create new item
  createItem: async (req, res) => {
    try {
      const itemData = req.body;
      
      // Validation
      if (!itemData.productId || !itemData.productName || !itemData.category) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
      }

      const newItem = await InventoryModel.create(itemData);
      
      res.status(201).json({
        success: true,
        data: newItem,
        message: 'Item created successfully'
      });
    } catch (error) {
      // Handle duplicate key error
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: 'Product ID already exists'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Failed to create item',
        error: error.message
      });
    }
  },

  // PUT /api/inventory/:id - Update item
  updateItem: async (req, res) => {
    try {
      const { id } = req.params;
      const itemData = req.body;
      
      const updatedItem = await InventoryModel.update(id, itemData);
      
      if (!updatedItem) {
        return res.status(404).json({
          success: false,
          message: 'Item not found'
        });
      }

      res.json({
        success: true,
        data: updatedItem,
        message: 'Item updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update item',
        error: error.message
      });
    }
  },

  // DELETE /api/inventory/:id - Delete item
  deleteItem: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await InventoryModel.delete(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Item not found'
        });
      }

      res.json({
        success: true,
        message: 'Item deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete item',
        error: error.message
      });
    }
  },

  // GET /api/inventory/stats - Get statistics
  getStats: async (req, res) => {
    try {
      const stats = await InventoryModel.getStats();
      
      res.json({
        success: true,
        data: stats,
        message: 'Statistics retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve statistics',
        error: error.message
      });
    }
  }
};

import express from 'express';
import { inventoryController } from '../controllers/inventoryController.js';

const router = express.Router();

// GET routes
router.get('/stats', inventoryController.getStats);
router.get('/category/:category', inventoryController.getItemsByCategory);
router.get('/:id', inventoryController.getItemById);
router.get('/', inventoryController.getAllItems);

// POST routes
router.post('/', inventoryController.createItem);

// PUT routes
router.put('/:id', inventoryController.updateItem);

// DELETE routes
router.delete('/:id', inventoryController.deleteItem);

export default router;

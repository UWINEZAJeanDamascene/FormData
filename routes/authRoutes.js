import express from 'express';
import { login, getAllUsers, createUser, updateUser, deleteUser, resetPassword } from '../controllers/authController.js';

const router = express.Router();

// Login route (public)
router.post('/login', login);

// User management routes (all admin routes below - middleware would be added here in production)
router.get('/users', getAllUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/users/:id/reset-password', resetPassword);

export default router;
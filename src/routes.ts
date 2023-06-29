import { Router } from 'express';
import {
  registerUser,
  loginUser,
  updateProfile,
  getUserByEmail,
  getUserByPhoneNumber,
  getUserByDocument,
  deleteUser,
  getAllUsers,
} from './controllers/user';

const router = Router();
//User EndPoints
router.post('/api/register', registerUser);
router.post('/api/login', loginUser);
router.get('/api/user/email/:email', getUserByEmail);
router.get('/api/user/cpf/:document', getUserByDocument);
router.get('/api/user/phone/:phone', getUserByPhoneNumber);
router.put('/api/user/update/:id', updateProfile);
router.delete('/api/user/delete/', deleteUser);
router.get('/api/users/', getAllUsers);

export default router;

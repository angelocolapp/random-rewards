import { Router } from 'express';
import {
  registerUser,
  loginUser,
  updateProfile,
  getUserByEmail,
  getUserByCpf,
  getUserByPhoneNumber,
} from './controllers/user';

const router = Router();

router.post('/api/register', registerUser);
router.post('/api/login', loginUser);
router.put('/api/profile/:id', updateProfile);
router.get('/api/user/email/:email', getUserByEmail);
router.get('/api/user/cpf/:cpf', getUserByCpf);
router.get('/api/user/phone/:phoneNumber', getUserByPhoneNumber);

export default router;

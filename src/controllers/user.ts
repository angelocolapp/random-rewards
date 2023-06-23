import { Request, Response } from 'express';
import userService from '../services/userService';
import { users } from '@prisma/client';
import { dateFromISOString } from '../helpers/date-format';
import { parse, formatISO } from 'date-fns';

export async function registerUser(req: Request, res: Response) {
    try {
      const { name, email, password, dateOfBirth, cpf, phoneNumber } = req.body;
  
      // Check if user with the same email or CPF already exists
      const convertedDate = dateFromISOString(formatISO(parse(dateOfBirth, "dd/MM/yyyy", new Date())))
      const existingUser = await userService.findByEmail(email);
      const existingUserByCpf = await userService.findByCpf(cpf);
      if (existingUser || existingUserByCpf) {
        return res.status(409).json({ error: 'User with the same email or CPF already exists' });
      }
      // Create user
      const newUser = await userService.createUser({
        name,
        email,
        password,
        dateofbirth: convertedDate,
        cpf,
        phonenumber: phoneNumber,
      } as users); // Add type assertion here
  
      return res.status(201).json(newUser);
    } catch (error) {
      console.error('Error in registerUser:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await userService.findByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if password matches
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // User authenticated successfully
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error in loginUser:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateProfile(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const { name, email, dateOfBirth, cpf, phoneNumber } = req.body;

    // Find user by ID
    const user = await userService.findUserById(Number(userId));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user profile
    const updatedUser = await userService.updateUser(Number(userId), {
      name,
      email,
      dateofbirth: dateOfBirth,
      cpf,
      phonenumber: phoneNumber,
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error in updateProfile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getUserByEmail(req: Request, res: Response) {
  try {
    const { email } = req.params;

    // Find user by email
    const user = await userService.findByEmail(email);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error in getUserByEmail:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getUserByCpf(req: Request, res: Response) {
  try {
    const { cpf } = req.params;

    // Find user by CPF
    const user = await userService.findByCpf(cpf);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error in getUserByCpf:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getUserByPhoneNumber(req: Request, res: Response) {
  try {
    const { phoneNumber } = req.params;

    // Find user by phone number
    const user = await userService.findByPhone(phoneNumber);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error in getUserByPhoneNumber:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
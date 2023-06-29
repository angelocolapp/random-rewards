import { Request, Response } from 'express';
import userService from '../services/userService';
import { User } from '@prisma/client';
import { dateFromISOString } from '../helpers/date-format';
import { parse, formatISO } from 'date-fns';
import { encryptPassword, comparePasswords } from '../middlewares/crypto';

export async function registerUser(req: Request, res: Response) {
    try {
      const { name, email, password, birthday, document, phone } = req.body;
  
      // Check if user with the same email or document already exists
      const convertedDate = dateFromISOString(formatISO(parse(birthday, "dd/MM/yyyy", new Date())))
      const existingUser = await userService.findByEmail(email);
      const existingUserBydocument = await userService.findByDocument(document);
      const encryptedPass = await encryptPassword(password);
      if (existingUser || existingUserBydocument) {
        return res.status(409).json({ error: 'User with the same email or document already exists' });
      }
      // Create user
      const newUser = await userService.createUser({
        name,
        email,
        password: encryptedPass,
        birthday: convertedDate,
        document: document,
        phone: phone,
      } as User); // Add type assertion here
  
      return res.status(201).json(" New user created sucessfully " + newUser);
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
    if (!(await comparePasswords(password, user.password))) {
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
    const { name, email, birthday, document, phone } = req.body;
    const convertedDate = dateFromISOString(formatISO(parse(birthday, "dd/MM/yyyy", new Date())))
    // Find user by ID
    const user = await userService.findUserById(Number(userId));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user profile
    const updatedUser = await userService.updateUser(Number(userId), {
      name,
      email,
      birthday: convertedDate,
      document,
      phone: phone,
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

export async function getUserByDocument(req: Request, res: Response) {
  try {
    const { document } = req.params;

    // Find user by document
    const user = await userService.findByDocument(document);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error in getUserBydocument:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getUserByPhoneNumber(req: Request, res: Response) {
  try {
    const { phone } = req.params;

    // Find user by phone number
    const user = await userService.findByPhone(phone);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error in getUserB phone:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const user = await userService.findUserById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const deletedUser = await userService.deleteUser(Number(id));

    return res.status(204).json("User Deleted Sucessfully" + deletedUser)
  }catch (error) {
    console.error('Error while deleting user', error);
    return res.status(500).json({ error: 'Internal server error'});
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const result = req.body;
    const users = await userService.findAll(result);
    return res.status(200).json(users);
  }catch (error) {
    console.error('Error while sending request', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
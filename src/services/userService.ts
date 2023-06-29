import { User } from '@prisma/client';
import prisma from '../database/db'

class UserService {
  async findAll(userData: User){
    return prisma.user.findMany();
  }

  async findByEmail(email: string) {
    return prisma.user.findFirst({
      where: { email },
    });
  }

  async findByDocument(document: string) {
    return prisma.user.findFirst({
      where: { document },
    });
  }

  async findByPhone(phone: string) {
    return prisma.user.findFirst({
      where: { phone },
    });
  }

  async findUserById(userid: number) {
    return prisma.user.findFirst({
      where: { userid },
    });
  }

  async createUser(userData: User) {
    return prisma.user.create({
      data: userData,
    });
  }

  async updateUser(userid: number, userData: Partial<User>) {
    return prisma.user.update({
      where: { userid },
      data: userData,
    });
  }

  async deleteUser(userid: number) {
    return prisma.user.delete({
      where: { userid },
    });
  }

  async getAllUsers() {
    return prisma.user.findMany();
  }
};

const userService = new UserService();

export default userService;
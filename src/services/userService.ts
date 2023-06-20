import { PrismaClient, users } from '@prisma/client';
import prisma from '../database/db'

class UserService {
  async findByEmail(email: string) {
    return prisma.users.findFirst({
      where: { email },
    });
  }

  async findByCpf(cpf: string) {
    return prisma.users.findFirst({
      where: { cpf },
    });
  }

  async findByPhone(phonenumber: string) {
    return prisma.users.findFirst({
      where: { phonenumber },
    });
  }

  async findUserById(id: number) {
    return prisma.users.findFirst({
      where: { id },
    });
  }

  async createUser(userData: users) {
    return prisma.users.create({
      data: userData,
    });
  }

  async updateUser(id: number, userData: Partial<users>) {
    return prisma.users.update({
      where: { id },
      data: userData,
    });
  }

  async deleteUser(id: number) {
    return prisma.users.delete({
      where: { id },
    });
  }

  async getAllUsers() {
    return prisma.users.findMany();
  }
};

const userService = new UserService();

export default userService;
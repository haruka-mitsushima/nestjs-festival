import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async getUserById(userId: number): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        userId: userId,
      },
    });
    delete user.password;
    return user;
  }
}

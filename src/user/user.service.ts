import { Injectable } from '@nestjs/common';
import { Cart, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createUser-dto';
import { LoginDto } from './dto/login-dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async login(dto: LoginDto): Promise<{ userId: number; userName: string }> {
    const user = await this.prisma.user.findFirst({
      where: {
        mailAddress: dto.mailAddress,
        password: dto.password,
      },
    });
    if (user) return { userId: user.userId, userName: user.userName };
  }

  async createUser(dto: CreateUserDto): Promise<{ message: string }> {
    await this.prisma.user.create({
      data: {
        ...dto,
      },
    });
    return { message: 'ok' };
  }

  async mailConditions(
    mail: string,
  ): Promise<{ result: boolean; message?: string }> {
    const user = await this.prisma.user.findFirst({
      where: {
        mailAddress: mail,
      },
    });

    if (!user) return { result: true };
    else
      return {
        result: false,
        message: 'このメールアドレスはすでに登録済みです',
      };
  }

  async getUserById(userId: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });
    delete user.password;
    return user;
  }

  async getUserName(userId: number): Promise<{ userName: string }> {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });
    return { userName: user.userName };
  }

  async selectCart(id: number): Promise<{ cart?: Cart[]; errorFlg: boolean }> {
    const data = await this.prisma.user.findUnique({
      where: {
        userId: id,
      },
      select: {
        carts: {
          include: {
            item: true,
          },
        },
      },
    });
    let errorFlg = false;
    if (!data) {
      errorFlg = true;
      return { errorFlg };
    } else {
      return { cart: data.carts, errorFlg };
    }
  }

  async updateUser(userId: number, favoriteGenre: number): Promise<void> {
    await this.prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        favoriteId: favoriteGenre,
      },
    });
  }
}

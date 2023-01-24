import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async getUserById(@Body('userId') id: string): Promise<User> {
    return await this.userService.getUserById(Number(id));
  }
}

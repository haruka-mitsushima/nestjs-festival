import { Body, Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUserById(@Body() user: { userId: number }): Promise<User> {
    return await this.userService.getUserById(Number(user.userId));
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/createUser-dto';
import { LoginDto } from './dto/login-dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(
    @Body() dto: LoginDto,
  ): Promise<{ userId: number; userName: string }> {
    return await this.userService.login(dto);
  }

  @Post('signup')
  async createUser(@Body() dto: CreateUserDto): Promise<{ message: string }> {
    return await this.userService.createUser(dto);
  }

  @Post('mailConditions')
  async mailConditions(
    @Body('mailAddress') mailAddress: string,
  ): Promise<{ result: boolean; message?: string }> {
    return await this.userService.mailConditions(mailAddress);
  }

  @Post()
  async getUserById(@Body('userId') id: string): Promise<User> {
    return await this.userService.getUserById(Number(id));
  }
}

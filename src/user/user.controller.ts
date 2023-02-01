import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Cart, User } from '@prisma/client';
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

  @Get('getUserName/:id')
  async getUserName(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<{ userName: string }> {
    return await this.userService.getUserName(userId);
  }

  @Get('selectCart/:id')
  async selectCart(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ cart?: Cart[]; errorFlg: boolean }> {
    return await this.userService.selectCart(Number(id));
  }

  @Get('updateUser/:userId/:favoriteGenre')
  async updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('favoriteGenre', ParseIntPipe) favoriteGenre: number,
  ): Promise<void> {
    await this.userService.updateUser(userId, favoriteGenre);
  }
}

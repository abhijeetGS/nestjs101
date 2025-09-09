import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { UpdateUserDto } from '../../dtos/UpdateUser.dto';
import { UsersService } from '../../services/users/users.service';
import { CreateUserProfileDto } from '../../dtos/CreateUserProfile.dto';
import { ParamsTokenFactory } from '@nestjs/core/pipes';
import { CreateUserPostDto } from '../../dtos/CreateUserPost.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  // Injector

  @Get()
  getUsers() {
    return this.userService.findUsers();
}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    // const { ...userDetails, confirmPassword } = createUserDto;
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }

  @Post(':id/profiles')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.userService.createUserProfile(id, createUserProfileDto);
  }

  @Post(':id/posts')
  createUserPost(@Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    return this.userService.createUserPost(id, createUserPostDto);
  }
}

import { Body, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../typeorm/entities/users';
import {
  CreateUserParams,
  UpdateUserParams,
  CreateUserProfileParams, CreateUserPostParams,
} from '../../../utils/types';
import { Profile } from '../../../typeorm/entities/Profile';
import { Post } from '../../../typeorm/entities/Post';




@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>,
              @InjectRepository(Profile) private profileRepository: Repository<Profile>,
              @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  findUsers() {
    return this.userRepository.find({ relations: ['profile', 'posts'] });
  }

  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      created_at: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  updateUser(id: number, updateUserDetails: UpdateUserParams){
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }

  deleteUser(id: number){
    return this.userRepository.delete({ id });
  }

  async createUserProfile(
    id: number,
    createUserProfileDetails: CreateUserProfileParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new NotFoundException(`User with id ${id} not found`);

    const newProfile = this.profileRepository.create(createUserProfileDetails);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
    }

  async createUserPost(
    id: number, createUserPostDetails: CreateUserPostParams){
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new NotFoundException(`User with id ${id} not found`);

    const newPost = this.postRepository.create({
      ...createUserPostDetails,
      user,
    });
    return this.postRepository.save(newPost);
    }
  }

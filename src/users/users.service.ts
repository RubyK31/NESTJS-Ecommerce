/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSignUpDto } from './dto/user-signup.dto';
import { compare, hash } from 'bcrypt';
import { UserSignInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signup(userSignUpDto: UserSignUpDto): Promise<UserEntity> {
    const userExists = await this.findUserByEmail(userSignUpDto.email);
    if (userExists) throw new BadRequestException('This email is unavailable!');
    userSignUpDto.password = await hash(userSignUpDto.password, 10);
    let user = this.userRepository.create(userSignUpDto);
    user = await this.userRepository.save(user);
    delete user.password;
    return user;
  }

  async signin(userSignInDto: UserSignInDto): Promise<UserEntity> {
    const userExists = await this.userRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: userSignInDto.email })
      .getOne();
    if (!userExists)
      throw new BadRequestException(
        'This email is not asssociated with any account',
      );
    const matchpassword = await compare(
      userSignInDto.password,
      userExists.password,
    );
    if (!matchpassword)
      throw new BadRequestException(
        'Password does not match with the given email',
      );
    delete userExists.password;
    return userExists;
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User with the given id not found');
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
  async accessToken(user: UserEntity): Promise<string> {
    return sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN },
    );
  }
}

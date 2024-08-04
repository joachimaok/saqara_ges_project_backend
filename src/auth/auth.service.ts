import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<{ token: string; message: string; user: User }> {
    const { username, password } = registerDto;
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new HttpException('User already exists', 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await this.userModel.create({
      username,
      password: hashedPassword,
    });
    const token = this.jwtService.sign({ id: createdUser._id });
    return {
      token,
      message: 'User registered successfully',
      user: createdUser,
    };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ token: string; message: string; user: User }> {
    const { username, password } = loginDto;
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new NotFoundException('Invalid username or password');
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const token = this.jwtService.sign({ id: user._id });
    return { token, message: 'User logged in successfully', user };
  }
}

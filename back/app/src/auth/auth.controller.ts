import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Get,
  Query,
  Res,
  Req,
  Body,
  Post,
  UnauthorizedException,
  Param,
  Patch,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { UserStatus } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly httpService: HttpService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  //42Oauth
  @Get('oauth/42/authorize')
  async loginWith42() {
    const clientId = process.env.FORTYTWO_CLIENT_ID;
    const redirectUrl = `${process.env.VITE_SERVER_URL}/auth/oauth/42/callback`;
    const url = `https://api.intra.42.fr/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code`;
    return { url };
  }

  @Get('oauth/42/callback')
  async loginWith42Callback(@Query('code') code: string, @Res() res: Response) {
    try {
      const token = await this.authService.getTokenFrom42(code);
      const userInfo = await this.authService.getUserInfoFrom42(
        token.access_token,
      );
      const { user, created } = await this.userService.findOrCreateUser(
        userInfo.data,
      );

      const newToken = await this.authService.jwtLogin({
        id: user.id,
        user_idx: user.idx,
      });

      this.userService.updateStatus(user.idx, UserStatus.ONLINE);
      // res.cookie('user_idx', user.idx, { sameSite: 'lax' });
      res.cookie('token', newToken, { sameSite: 'lax' });

      if (created == false) {
        if (user.tfa_enabled)
          res.redirect(`${process.env.FRONT_SERVER_URL}/authentication`);
        else res.redirect(`${process.env.FRONT_SERVER_URL}/main`);
      } else res.redirect(`${process.env.FRONT_SERVER_URL}/avatar-setting`);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMyData(@Req() req, @Res() res) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new Error('No authorization header');
      }
      const tokenPart = authHeader.split(' ');
      if (tokenPart.length !== 2 || tokenPart[0] !== 'Bearer') {
        throw new Error('Invalid authorization header');
      }
      const accessToken = tokenPart[1];

      const data = await this.authService.parsingJwtData(accessToken);
      res.status(200).send(data);
      return data;
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  }

  @Get('profile')
  async getUserInfo(@Req() req): Promise<any> {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new Error('No authorization header');
      }
      const tokenPart = authHeader.split(' ');
      if (tokenPart.length !== 2 || tokenPart[0] !== 'Bearer') {
        throw new Error('Invalid authorization header');
      }
      const accessToken = tokenPart[1];

      const userInfo = await this.authService.getUserInfoFrom42(accessToken);
      const userData = userInfo.data;
      const user = await this.userService.findOrCreateUser(userData);

      return user;
    } catch (error) {
      throw error;
    }
  }
}

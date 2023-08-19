import {Controller, Body, Post, UnauthorizedException} from '@nestjs/common';
import {AuthService} from "../services/auth.service";
import {User} from "@prisma/client";
import {UserModel} from "../models/auth.model-dto";
import {ApiTags} from "@nestjs/swagger";
import {JwtPayload} from "../../../core/auth/jwt-payload.interface";
import {JwtService} from "@nestjs/jwt";

@Controller('')
@ApiTags("Auth")
export class AuthController {
    constructor(private authService: AuthService, private readonly jwtService: JwtService,) {
    }

    @Post("/register")
    async createUser(@Body() userData: UserModel): Promise<User> {
        return this.authService.createUser(userData);
    }

    @Post('login')
    async login(@Body() loginDto: UserModel): Promise<{ accessToken: string }> {
        const user = await this.authService.validateUser(loginDto.username, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload: JwtPayload = {sub: user.id, username: user.username};
        const accessToken = this.jwtService.sign(payload);
        return {accessToken};
    }
}

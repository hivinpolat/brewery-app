import {Injectable, NestMiddleware, UnauthorizedException} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';
import {JwtService} from '@nestjs/jwt';
import {PrismaService} from "../prisma/prisma.service";
import {AuthService} from "../../src/auth/services/auth.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly authService: AuthService,
        private readonly prisma: PrismaService,
    ) {
    }

    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing or invalid token');
        }

        const token = authHeader.slice(7); // Remove 'Bearer ' prefix

        try {
            const decoded = await this.authService.verifyToken(token);
            const user = await this.prisma.prisma.user.findUnique({where: {id: decoded.sub}});
            if (!user) {
                throw new UnauthorizedException('User not found');
            }
            // Attach user object to request for use in the controller

            req.user = {
                password: user.password,
                id: user.id,
                username: user.username
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }

        next(); // Pass control to the next middleware
    }
}

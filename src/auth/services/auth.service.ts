import {Injectable, ConflictException} from '@nestjs/common';
import {PrismaService} from "core/prisma/prisma.service";
import {User} from '@prisma/client';
import {UserModel} from "../models/auth.model-dto";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private readonly jwtService: JwtService) {
    }

    async createUser(data: UserModel) {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const user = await this.prisma.prisma.user.create({
                data: {
                    username: data.username,
                    password: hashedPassword,
                },
            });
            return user;
        } catch (error) {
            if (error.code === 'P2002' && error.meta?.target?.includes('username')) {
                throw new ConflictException('Username already exists');
            }
            throw error;
        }
    }

    async validateUserById(userId: number): Promise<User> {
        // userId'yi kullanarak veritabanını sorgulayarak kullanıcıyı doğrulayın
        return this.prisma.prisma.user.findUnique({where: {id: userId}});
    }

    async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.prisma.prisma.user.findUnique({where: {username}});

        if (!user) {
            return null; // Kullanıcı bulunamazsa null döndür
        }

        // Girilen şifre ile kullanıcının şifresini karşılaştır
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        return user;
    }

    async createToken(payload: any): Promise<string> {
        const secretKey = process.env.JWT_SECRET
        return this.jwtService.signAsync(payload, {secret: secretKey});
    }

    async verifyToken(token: string): Promise<any> {
        try {
            const secretKey = process.env.JWT_SECRET
            const decoded = await this.jwtService.verifyAsync(token, {secret: secretKey});
            return decoded;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }


}

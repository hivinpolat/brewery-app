import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../../core/prisma/prisma.service";
import {User} from '@prisma/client';
import {UserModel} from "../models/auth.model-dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {
    }

    async createUser(data: UserModel): Promise<User> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.prisma.prisma.user.create({
      data: {
        username: data.username,
        password: hashedPassword, // Hashlenmiş şifre
      },
    });
    return user;
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


}

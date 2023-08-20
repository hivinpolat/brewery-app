import {Module} from '@nestjs/common';
import {AuthController} from './controllers/auth.controller';
import {AuthService} from './services/auth.service';
import {PrismaService} from "../../core/prisma/prisma.service";
import {JwtModule, JwtService} from "@nestjs/jwt";

@Module({
    imports: [JwtModule],
    controllers: [AuthController],
    providers: [AuthService, PrismaService,JwtService]
})
export class AuthModule {
}

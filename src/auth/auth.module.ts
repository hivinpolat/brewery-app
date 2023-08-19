import {Module} from '@nestjs/common';
import {AuthController} from './controllers/auth.controller';
import {AuthService} from './services/auth.service';
import {PrismaService} from "../../core/prisma/prisma.service";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "../../core/auth/jwt.strategy";

@Module({
    imports: [JwtModule.register({
        secret: 'your-secret-key', // Aynı gizli anahtarı burada da belirtin
        signOptions: {expiresIn: '1h'}, // İsteğe bağlı: Token süresi
    }),],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, JwtStrategy]
})
export class AuthModule {
}

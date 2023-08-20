import {Module, MiddlewareConsumer} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {BreweryModule} from './brewery/brewery.module';
import {LoggingMiddleware} from "../core/middleware/logging.middleware";
import {AuthMiddleware} from "../core/middleware/auth.middleware";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {PrismaService} from "../core/prisma/prisma.service";
import {AuthService} from "./auth/services/auth.service";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [AuthModule, BreweryModule, ConfigModule.forRoot(), JwtModule.registerAsync({
        useFactory: async () => ({
            secret: process.env.JWT_SECRET, // Use the secret from environment variables
        }),
    }),],
    controllers: [],
    providers: [JwtService, PrismaService, AuthService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggingMiddleware).forRoutes('*'); // Use for all routes
        consumer.apply(AuthMiddleware).forRoutes('/breweries'); // Apply to /breweries route
    }
}

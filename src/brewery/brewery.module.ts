import {Module} from '@nestjs/common';
import {BreweryController} from './controllers/brewery.controller';
import {BreweryService} from './services/brewery.service';
import {HttpModule} from "@nestjs/axios";
import {JwtService} from "@nestjs/jwt";
import {AuthService} from "../auth/services/auth.service";
import {PrismaService} from "../../core/prisma/prisma.service";


@Module({
    imports: [HttpModule],
    controllers: [BreweryController],
    providers: [BreweryService,AuthService,PrismaService,JwtService]
})
export class BreweryModule {
}

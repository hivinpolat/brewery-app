import {Controller, Get, Query, Headers, UnauthorizedException, NotFoundException} from '@nestjs/common';
import {BreweryService} from "../services/brewery.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {BreweryModelDto} from "../models/brewery.model-dto";
import {AuthService} from "../../auth/services/auth.service";

@Controller('/')
@ApiTags("Brewery")
@ApiBearerAuth()
export class BreweryController {
    constructor(private breweryService: BreweryService, private authService: AuthService) {
    }

    @Get('/breweries')
    async getBreweries(
        @ Headers('authorization') authHeader: string,
        @Query('query') query?: string
    ): Promise<BreweryModelDto[]> {
        try {
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw new UnauthorizedException('Unauthorized');
            }

            const token = authHeader.substring('Bearer '.length);
            const tokenPayload = await this.authService.verifyToken(token);

            if (!tokenPayload) {
                throw new UnauthorizedException('Unauthorized');
            }

            const breweries = await this.breweryService.getBreweries(query);
            if (!breweries || breweries.length === 0) {
                throw new NotFoundException('Breweries not found');
            }

            return breweries;
        } catch (error) {
            throw new UnauthorizedException('Unauthorized');
        }
    }
}

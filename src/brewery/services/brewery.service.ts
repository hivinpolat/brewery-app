import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {BreweryModelDto} from "../models/brewery.model-dto";

@Injectable()
export class BreweryService {
    constructor(private httpService: HttpService) {
    }

    async getBreweries(query?: string): Promise<BreweryModelDto[]> {
        const apiUrl = query
            ? `https://api.openbrewerydb.org/breweries/search?query=${query}`
            : 'https://api.openbrewerydb.org/breweries';

        const response = await this.httpService.get(apiUrl).toPromise();
        return response.data;
    }

}

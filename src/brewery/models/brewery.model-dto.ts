import {ApiProperty} from '@nestjs/swagger';

export class BreweryModelDto {
    @ApiProperty({description: 'Unique identifier of the brewery'})
    id: string;

    @ApiProperty({description: 'Name of the brewery'})
    name: string;

    @ApiProperty({description: 'Type of the brewery'})
    brewery_type: string;

    @ApiProperty({description: 'First address line'})
    address_1: string;

    @ApiProperty({description: 'Second address line', required: false})
    address_2: string | null;

    @ApiProperty({description: 'Third address line', required: false})
    address_3: string | null;

    @ApiProperty({description: 'City where the brewery is located'})
    city: string;

    @ApiProperty({description: 'State or province'})
    state_province: string;

    @ApiProperty({description: 'Postal code'})
    postal_code: string;

    @ApiProperty({description: 'Country'})
    country: string;

    @ApiProperty({description: 'Longitude coordinate'})
    longitude: string;

    @ApiProperty({description: 'Latitude coordinate'})
    latitude: string;

    @ApiProperty({description: 'Phone number'})
    phone: string;

    @ApiProperty({description: 'Website URL of the brewery'})
    website_url: string;

    @ApiProperty({description: 'State abbreviation'})
    state: string;

    @ApiProperty({description: 'Street name'})
    street: string;
}

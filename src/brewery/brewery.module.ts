import { Module } from '@nestjs/common';
import { BreweryController } from './controllers/brewery.controller';
import { BreweryService } from './services/brewery.service';

@Module({
  controllers: [BreweryController],
  providers: [BreweryService]
})
export class BreweryModule {}

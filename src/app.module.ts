import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {BreweryModule} from './brewery/brewery.module';

@Module({
    imports: [AuthModule, BreweryModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}

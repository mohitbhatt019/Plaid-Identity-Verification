import { Module } from '@nestjs/common';
import { PlaidModule } from './plaid/plaid.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PlaidModule,ConfigModule.forRoot()],
  // controllers: [PlaidController],
  // providers: [PlaidService],
})
export class AppModule {}

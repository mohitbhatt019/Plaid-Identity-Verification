// src/plaid/plaid.module.ts
import { Module } from '@nestjs/common';
import { PlaidController } from './plaid.controller';
import { PlaidService } from './plaid.service';

@Module({
  controllers: [PlaidController],
  providers: [PlaidService],
})
export class PlaidModule {}

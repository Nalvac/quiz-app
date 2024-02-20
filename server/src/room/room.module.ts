import { Module } from '@nestjs/common';
import { RoomsController } from './room.controller';
import { RoomsGateway } from './room.gateway';
import { RoomsService } from './room.service';

@Module({
  controllers: [RoomsController],
  providers: [RoomsGateway, RoomsService],
})
export class RoomsModule {}

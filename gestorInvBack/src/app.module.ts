import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AsistentePrincipalModule } from './asistentePrincipal/asistentePrincipal.module';
import { AsistenteModule } from './asistente/asistente.module';

@Module({
  imports: [AsistentePrincipalModule, AsistenteModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { AsistenteController } from "./asistente.controller";
import { AsistenteService } from "./asistente.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [AsistenteController],
    providers: [AsistenteService, PrismaService],
})
export class AsistenteModule {}
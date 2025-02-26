import { Module } from "@nestjs/common";
import { AsistentePrincipalController } from "./asistentePrincipal.controller";
import { AsistentePrincipalService } from "./asistentePrincipal.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [AsistentePrincipalController],
    providers: [AsistentePrincipalService, PrismaService],
})
export class AsistentePrincipalModule {}
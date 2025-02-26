import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAsistenteDto } from "./dto/create-asistente.dto";
import { UpdateAsistenteDto } from "./dto/update-asistente.dto";

@Injectable()
export class AsistenteService {
    constructor(private prisma: PrismaService) {}

    async create(createAsistenteDto: CreateAsistenteDto) {
        const asistentePrincipal = await this.prisma.asistentePrincipal.findUnique
        ({
            where: { id: createAsistenteDto.idPrincipal},
        });

        if (!asistentePrincipal) {
            throw new Error('El asistente principal no existe');
        }

        if (asistentePrincipal.asistentes >= 4) {
            throw new Error('No se pueden agregar mas de 3 acompañantes');
        }

        const nuevoAsistente = await this.prisma.asistente.create({
            data: {
                nombre: createAsistenteDto.nombre,
                idPrincipal: createAsistenteDto.idPrincipal,
            },
        });

        await this.prisma.asistentePrincipal.update({
            where: { id: createAsistenteDto.idPrincipal },
            data: { asistentes: asistentePrincipal.asistentes + 1 },
        });

        return nuevoAsistente;
    }

    async findAll() {
        const asistentes = await this.prisma.asistente.findMany();

        return asistentes.map((asistente) => ({
            id: asistente.id,
            nombre: asistente.nombre,
            idPrincipal: asistente.idPrincipal,
        }));
    }

    async findNombresByInvitado(idPrincipal: number) {
        const invitadoPrincipal = await this.prisma.asistentePrincipal.findUnique({
            where: { id: idPrincipal },
        });

        if (!invitadoPrincipal) {
            throw new NotFoundException('Invitado principal no encontrado');
        }

        const acompañantes = await this.prisma.asistente.findMany({
            where: { idPrincipal },
            select: { nombre: true },
        });

        return acompañantes.map((a) => a.nombre);
    }

    async update(id: number, updateAsistenteDto: UpdateAsistenteDto) {
        return this.prisma.asistente.update({
            where: { id },
            data: updateAsistenteDto,
        });
    }

    async remove(id: number) {
        return this.prisma.asistente.delete({
            where: { id },
        });
    }
}
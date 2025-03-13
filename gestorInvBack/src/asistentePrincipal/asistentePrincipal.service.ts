import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAsistentePrincipalDto } from "./dto/create-asistentePrincipal.dto";
import { UpdateAsistentePrincipalDto } from "./dto/update-asistentePrincipal.dto";

@Injectable()
export class AsistentePrincipalService {
    constructor(private prisma: PrismaService) { }

    async create(createAsistentePrincipalDto: CreateAsistentePrincipalDto) {
        const { nombre, numero, cantidadInv } = createAsistentePrincipalDto;

        const existeAsistente = await this.prisma.asistentePrincipal.findFirst({
            where: { numero },
        });

        if (existeAsistente) {
            throw new BadRequestException('Ese numero ya esta registrado.');
        }

        return this.prisma.asistentePrincipal.create({
            data: {
                nombre,
                numero,
                cantidadInv,
                asistentes: 1,
            },
        });
    }

    async findAll() {
        const invitadosPrincipales = await this.prisma.asistentePrincipal.findMany({
            include: {
                asistentesRelacionados: true,
            },
        });

        return invitadosPrincipales.map((invitado) => ({
            id: invitado.id,
            nombre: invitado.nombre,
            numero: invitado.numero,
            cantidadInv: invitado.cantidadInv,
            totalInvitados: invitado.asistentes,
        }));
    }

    async findByNumero(numero: string) {
        const asistente = await this.prisma.asistentePrincipal.findFirst({
            where: { numero },
            select: { id: true },
        });

        if (!asistente) {
            throw new BadRequestException('No se encontro el invitado.');
        }

        return asistente.id;
    }

    async update(id: number, updateAsistentePrincipalDto: UpdateAsistentePrincipalDto) {
        return this.prisma.asistentePrincipal.update({
            where: { id },
            data: updateAsistentePrincipalDto,
        });
    }

    async remove(id: number) {
        await this.prisma.asistente.deleteMany({
            where: { idPrincipal: id },
        });

        return this.prisma.asistentePrincipal.delete({
            where: { id },
        });
    }

    async findOne(id: number) {
        return this.prisma.asistentePrincipal.findUnique({
            where: { id },
            include: {
                asistentesRelacionados: true,
            },
        });
    }
}
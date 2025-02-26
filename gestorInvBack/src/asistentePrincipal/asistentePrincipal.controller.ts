import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { AsistentePrincipalService } from "./asistentePrincipal.service";
import { CreateAsistentePrincipalDto } from "./dto/create-asistentePrincipal.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateAsistentePrincipalDto } from "./dto/update-asistentePrincipal.dto";

@ApiTags('asistentesPrincipales')
@Controller('asistentePrincipal')
export class AsistentePrincipalController {
    constructor(
        private readonly asistentePrincipalService: AsistentePrincipalService,
    ) { }

    @Post('registrar')
    @ApiOperation({ summary: 'Registrar un asistente principal' })
    @ApiResponse({ status: 201, description: 'Asistente principal registrado correctamente' })
    @ApiResponse({ status: 400, description: 'El nombre o numero ya estan registrados' })
    async create(@Body() createAsistentePrincipalDto: CreateAsistentePrincipalDto){
        try {
            return await this.asistentePrincipalService.create(createAsistentePrincipalDto);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }
            throw error;
        }
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los invitados' })
    @ApiResponse({ status: 200, description: 'Lista de invitados' })
    async findAll() {
        return this.asistentePrincipalService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        const asistente = await this.asistentePrincipalService.findOne(+id);
        if (!asistente) {
            throw new NotFoundException('Invitado no encontrado.');
        }
        return asistente;
    }

    @Put(':id')
    @ApiOperation({ summary: 'Editar un invitado' })
    @ApiResponse({ status: 200, description: 'Invitado editado correctamente' })
    async update(
        @Param('id') id: number,
        @Body() updateAsistentePrincipalDto: UpdateAsistentePrincipalDto,
    ) {
        const asistente = await this.asistentePrincipalService.update(
            +id,
            updateAsistentePrincipalDto,
        );
        if (!asistente) {
            throw new NotFoundException ('Invitado no encontrado.');
        }
        return asistente;
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un asistente y sus invitados '})
    @ApiResponse({ status: 200, description: 'Datos eliminados correctamente'})
    @ApiResponse({ status: 400, description: 'El invitado no existe' })
    async remove(@Param('id') id: number) {
        const asistente = await this.asistentePrincipalService.remove(+id);
        if(!asistente) {
            throw new NotFoundException('Invitado principal no encontrado.');
        }
        return { message: 'Datos eliminados correctamente.' };
    }
}
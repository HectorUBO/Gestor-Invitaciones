import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { AsistenteService } from "./asistente.service";
import { CreateAsistenteDto } from "./dto/create-asistente.dto";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateAsistenteDto } from "./dto/update-asistente.dto";

@ApiTags('asistentes')
@Controller('asistente')
export class AsistenteController {
    constructor(private readonly asistenteService: AsistenteService) { }

    @Post('registrar')
    @ApiOperation({ summary: 'Registrar un acompañante' })
    @ApiResponse({ status: 201, description: 'Acompañante registrado con éxito' })
    @ApiResponse({ status: 400, description: 'No se pueden agregar más de 3 acompañantes' })
    @ApiResponse({ status: 404, description: 'El asistente principal no existe' })
    create(@Body() createAsistenteDto: CreateAsistenteDto) {
        return this.asistenteService.create(createAsistenteDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los acompañantes' })
    @ApiResponse({ status: 200, description: 'Lista de acompañantes' })
    @ApiResponse({ status: 404, description: 'No se encontraron acompañantes' })
    async findAll() {
        return this.asistenteService.findAll();
    }

    @Get(':idPrincipal/nombres')
    @ApiOperation({ summary: 'Obtener los nombres de todos los asistentes' })
    @ApiParam({ name: 'idPrincipal', description: 'ID del invitado principal' })
    @ApiResponse({ status: 200, description: 'Lista de nombres de los asistentes' })
    @ApiResponse({ status: 404, description: 'Invitado principal no encontrado' })
    async findNombresByInvitado(@Param('idPrincipal') idPrincipal: number) {
        try {
            return await this.asistenteService.findNombresByInvitado(+idPrincipal);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar datos de asistentes' })
    @ApiParam({ name: 'id', description: 'ID del asistente' })
    @ApiResponse({ status: 200, description: 'Asistente editado correctamente' })
    @ApiResponse({ status: 404, description: 'Asistente no encontrado' })
    async update(
        @Param('id') id: number,
        @Body() updateAsistenteDto: UpdateAsistenteDto,
    ) {
        const asistente = await this.asistenteService.update(+id, updateAsistenteDto);
        if (!asistente) {
            throw new NotFoundException('Asistente no encontrado.');
        }
        return asistente;
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un asistente' })
    @ApiParam({ name: 'id', description: 'ID del asistente' })
    @ApiResponse({ status: 200, description: 'Asistente eliminado correctamente' })
    @ApiResponse({ status: 404, description: 'Asistente no encontrado' })
    async remove(@Param('id') id: number) {
        const asistente = await this.asistenteService.remove(+id);
        if (!asistente) {
            throw new NotFoundException('Asistente no encontrado.');
        }
        return { message: 'Asistente eliminado correctamente.' };
    }
}
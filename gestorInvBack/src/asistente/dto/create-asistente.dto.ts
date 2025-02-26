import { ApiProperty } from "@nestjs/swagger";

export class CreateAsistenteDto {
    @ApiProperty({ example: 'Juan Perez', description: 'Nombre del acompañante' })
    nombre: string;

    @ApiProperty({ example: 1, description: 'ID del asistente principal' })
    idPrincipal: number;
}
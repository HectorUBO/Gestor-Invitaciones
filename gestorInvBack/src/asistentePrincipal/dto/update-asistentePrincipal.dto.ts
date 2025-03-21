import { ApiProperty } from "@nestjs/swagger";

export class UpdateAsistentePrincipalDto {
    @ApiProperty({ example: 'Hector Barreda', description: 'Nombre del asistente principal' })
    nombre?: string;

    @ApiProperty({ example: '9981501728', description: 'Numero de telefono del asistente principal' })
    numero?: string;
}
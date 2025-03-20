import { ApiProperty } from "@nestjs/swagger";

export class CreateAsistentePrincipalDto {
    @ApiProperty({ example: 'Hector Barreda', description: 'Nombre del asistente principal' })
    nombre: string;

    @ApiProperty({ example: '9981491627', description: 'Numero de telefono del asistente principal' })
    numero: string;

    @ApiProperty({ example: '1, 2, 3...', description: 'Cantidad de acompañantes'})
    cantidadInv: number;

    @ApiProperty({ example: 'true', description: 'Si asistira o no' })
    asistira: boolean;
}
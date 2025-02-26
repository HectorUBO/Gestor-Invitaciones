import { ApiProperty } from "@nestjs/swagger";

export class UpdateAsistenteDto {
    @ApiProperty({ example: 'Juan Perez', description: 'Nombre del acompañante' })
    nombre?: string;
}
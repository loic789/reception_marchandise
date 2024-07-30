import { ApiProperty } from "@nestjs/swagger"

export class SelectArtDto {
    @ApiProperty()
    IDART: number
    @ApiProperty()
    DESA1: string
    @ApiProperty()
    GPCOPIECE: string
}

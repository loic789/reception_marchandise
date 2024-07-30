import { ApiProperty } from "@nestjs/swagger";

export class SelectWindChillDto {

    @ApiProperty()
    reference : string;
    
    @ApiProperty()
    ID : string;

}

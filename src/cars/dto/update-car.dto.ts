import { IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class UpdateCarDto {

    @IsString()
    @IsUUID()
    @IsOptional()
    readonly id: string;

    @IsString({ message: 'brand deberia ser un string' })
    @IsOptional()
    readonly brand: string;

    // @MinLength(3)
    @IsString()
    @IsOptional()
    readonly model: string;



}
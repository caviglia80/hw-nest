import { IsString, MinLength, minLength } from "class-validator";

export class CreateCarDto {

    @IsString({ message: 'brand deberia ser un string' })
    readonly brand: string;

    @IsString()
    // @MinLength(3)
    readonly model: string;



}
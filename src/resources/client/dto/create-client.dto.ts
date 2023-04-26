import { IsNotEmpty, IsString, IsNumber, IsPositive, IsOptional } from "class-validator";

export class CreateClientDto {

    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    lastName: string;
    
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    age: number;
    
    @IsNotEmpty()
    @IsString()
    gender: string;
    
    @IsNotEmpty()
    @IsString()
    educationLevel: string;
    
    @IsNotEmpty()
    @IsString()
    nationality: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    date?: string;;
    
    @IsOptional()
    @IsNumber()
    @IsPositive()
    time?: number;

}

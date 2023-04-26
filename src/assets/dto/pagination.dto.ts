import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

    @Type(() => Number)
    readonly page?: number;

    @Type(() => Number)
    readonly itemsPage?: number;

    readonly word?: string;

}
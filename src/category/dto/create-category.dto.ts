import { IsDate, IsDateString, IsInt, IsString } from "class-validator";

export class CreateCategoryDTO {

    @IsString()
    name: string;
    @IsString()
    imageLink: string;


}
import { IsDate, IsDateString, IsInt, IsString } from "class-validator";
import { CreateCategoryDTO } from "./create-category.dto";

export class UpdatePutUserDTO extends CreateCategoryDTO {
    
    @IsString()
    name: string;
    @IsString()
    imageLink: string;



}
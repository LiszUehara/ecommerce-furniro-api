import { IsDate, IsDateString, IsInt, IsString } from "class-validator";
import { CreateCategoryDTO } from "./create-category.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdatePatchUserDTO extends PartialType(CreateCategoryDTO) {

}
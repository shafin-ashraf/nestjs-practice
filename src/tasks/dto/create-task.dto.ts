import { IsNotEmpty } from "class-validator";
export class CreatetTaskDto {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description: string
}
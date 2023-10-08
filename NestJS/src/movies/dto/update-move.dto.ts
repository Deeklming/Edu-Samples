import { PartialType } from "@nestjs/mapped-types";
// import { IsNumber, IsString } from "class-validator";
import { CreateMovieDto } from "./create-movie.dto";

export class UpdateMovieDto extends PartialType(CreateMovieDto){}//@nestjs/mapped-types을 써서 아래 주석과 같게 만듬

/*
export class UpdateMovieDto{
    @IsString()
    readonly title?: string;//?는 필수는 아니게하기 위함
    @IsNumber()
    readonly year?: number;
    @IsString({ each: true })
    readonly genres?: string[];
}
*/

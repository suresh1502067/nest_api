import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { AuthuserService } from './authuser.service';
import { CreateAuthuserDto } from './dto/create-authuser.dto';

@Controller('authuser')
export class AuthuserController {
  constructor(private readonly authuserService: AuthuserService) {}

  @Post('create')
  create(@Body() createAuthuserDto: CreateAuthuserDto) {
    return this.authuserService.create(createAuthuserDto);
  }

  @Get()
  async findQuery(@Query('id') id:string){ // if you want use the query params from get Api u can use like this
    return this.authuserService.findOne(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) { // if you want to get the params you can use like this..
    return this.authuserService.findOne(id);
  }

  @Post('signin')

  async signin(@Body() CreateAuthuserDto:CreateAuthuserDto){
    return this.authuserService.signin(CreateAuthuserDto)
  }

  // @Get()
  // findAll() {
  //   return this.authuserService.findAll();
  // }


  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthuserDto: UpdateAuthuserDto) {
  //   return this.authuserService.update(+id, updateAuthuserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authuserService.remove(+id);
  // }
}

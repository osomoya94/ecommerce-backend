import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { updateUser } from './Dto/createUser.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(@Query('page') page?: number, @Query('limit') limit?: number) {
    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 5;

    return this.userService.getUsers(pageNumber, limitNumber);
  }

  // @Post() // bien
  // createUser(@Body() user: createUser) {
  //   return this.userService.createUser(user);
  // } no usaremos ya el user

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBody({ type: updateUser })
  @ApiOkResponse({
    description: 'User actulizado',
    schema: { example: { message: 'El usuario no ha sido actulizado' } },
  })
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userData: Partial<updateUser>,
  ) {
    return this.userService.updateUser(id, userData);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteUserById(id);
  }

  @ApiBearerAuth()
  @Get(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUsersById(id);
  }
}

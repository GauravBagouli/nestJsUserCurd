import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { UserService } from '../../service/user/user.service';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Post('/create')
    async createUser(@Res() response: any, @Body() params: any) {
        try {
            const userParams = params;
            const emailId = userParams.email;
            const userExits = await this.userService.getUserByEmail(emailId);
            if(userExits) {
                return response.status(HttpStatus.CONFLICT).json({
                    message: 'User already exists with same email!'
                });
            }
            const newUser = await this.userService.createUser(params);
            return response.status(HttpStatus.CREATED).json({
                message: 'User has been created successfully',
                newUser,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: User not created!',
                error: 'Bad Request'
            });
        }
    }
    @Post('create/:id')
    async updateUser(@Res() response: any, @Body() userId: string,
        @Body() params: object) {
        try {
            const existingUser = await this.userService.updateUser(userId, params);
            return response.status(HttpStatus.OK).json({
                message: 'User has been successfully updated',
                existingUser,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    @Get('/list')
    async getUsers(@Res() response: any) {
        try {
            const userData = await this.userService.getAllUsers();
            return response.status(HttpStatus.OK).json({
                message: 'All users data found successfully', userData,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    @Get('/:id')
    async getUserByID(@Res() response: any, @Param('id') userId: string) {
        try {
            const existingUser = await this.userService.getUserByID(userId);
            return response.status(HttpStatus.OK).json({
                message: 'User found successfully', existingUser,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    @Delete('delete/:id')
    async deleteUser(@Res() response: any, @Param('id') userId: string) {
        try {
            const deletedUser = await this.userService.deleteUser(userId);
            return response.status(HttpStatus.OK).json({
                message: 'User deleted successfully',
                deletedUser,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}
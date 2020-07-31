import { Controller, UseGuards,Post, Body, OnModuleInit, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import  { MessagePattern,GrpcMethod, Client, ClientGrpc } from '@nestjs/microservices'
import { microserviceOptions } from '../grpc.options'
import { User } from './user.entity'
import { AuthGuard } from '../guards/AuthGuard';
import { IGrpcService } from "src/grpc.interface";

@Controller()
export class UserController {

   
    constructor(
        private readonly userService: UserService
    ) {}


    // @MessagePattern({ role: 'user', cmd: 'get'})
    @GrpcMethod('UserController', 'getUser')

   
    async getUser(data: any): Promise<User> {
        return this.userService.findOne({ username: data.username})
    }

    @UseGuards(AuthGuard)
    @Get('greet')
    async greet(): Promise<string> {
        return 'Greetings authenticated user'
    }
}
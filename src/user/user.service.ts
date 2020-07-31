import { Injectable, Logger } from "@nestjs/common";
import  { InjectRepository } from '@nestjs/typeorm'
import { Repository, InsertResult, FindConditions } from 'typeorm';
import { User } from './user.entity'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRespository: Repository<User>
    ) {}

    findOne(query: FindConditions<User>): Promise<User> {
        return this.userRespository.findOne(query);
    }

   public async createUser(user: any): Promise<InsertResult> {
        try {
            

            const userEntity = this.userRespository.create(user);

            const res = await this.userRespository.insert(userEntity);

            Logger.log('CreateUser -- created user')

            return res
        } catch (error) {
            Logger.log(error)
            throw error
        }
    }
}
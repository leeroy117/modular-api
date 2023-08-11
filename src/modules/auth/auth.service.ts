import { DatabaseService } from '../../database/database.service';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
    constructor(private databaseService: DatabaseService ){}
    async login(username: string, password: string) {
        const { mysqlConnection, sshConnection } = await this.databaseService.getConnection();

        try {
            
        } catch (error) {
            await mysqlConnection.rollback();
        } finally {
            mysqlConnection.end();
            sshConnection.end();
        }

    }
}
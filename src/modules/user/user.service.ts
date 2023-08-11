import { DatabaseService } from '../../database/database.service';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(private databaseService: DatabaseService ){}
    async get() {
        const id_persona = 200;
        const { mysqlConnection, sshConnection } = await this.databaseService.getConnection();

        try {
            await mysqlConnection.beginTransaction();
    
            const [rows, fields] = await mysqlConnection.execute('SELECT * FROM escolar.tb_personas WHERE id = ?;', [id_persona]);
            console.log("🚀 ~ file: user.service.ts:18 ~ UserService ~ get ~ rows:", rows)
            console.log("🚀 ~ file: user.service.ts:18 ~ UserService ~ get ~ rows:", fields)

            await mysqlConnection.commit();
            
        } catch (error) {
            await mysqlConnection.rollback();
        } finally {
            mysqlConnection.end();
            sshConnection.end();
        }

    }
    getUser(userId: number) {
        return { userId };
    }
    create(req: Request) {
        return req.body;
    }
    update(req: UpdateUserDto, param: { userId: number }) {
        return { body: req, param };
    }
    delete(param: { userId: number }) {
        return param;
    }
}
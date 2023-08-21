import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserService } from './../user/user.service';
import { DatabaseService } from '../../common/database/database.service';
import { GetUserDto } from '../user/dto/get-user.dto';

// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private databaseService: DatabaseService, 
        private userService: UserService,
        private readonly jwtService: JwtService
        ){}

    async login({ username, password }: LoginAuthDto) {
        
        const { mysqlConnection, sshConnection } = await this.databaseService.getConnection();

        try {
            const user: GetUserDto = await this.userService.getByUsername(username);

            if (typeof user == 'undefined') {
                throw new UnauthorizedException(
                        'Usuario y/o contraseña incorrectos', 
                        { 
                            cause: new Error(), 
                            description: 'Usuario y/o contraseña incorrectos' 
                        })
            }

            const responsePassword = 
                    await mysqlConnection.execute(`SELECT escolar.function_get_password(?) AS 'password';`, [password]);

            const passwordDb: string = responsePassword[0][0].password;

            if (passwordDb !== user.password) {
                throw new UnauthorizedException(
                    /*Message*/'Usuario y/o contraseña incorrectos',
                    /*Error*/ 'Usuario y/o contraseña no coinciden.'
                );
            };

            delete user.password;
            delete user.id;
            delete user.id

            return this.jwtService.signAsync(user);

        } catch (error) {
            console.log("🚀 ~ file: auth.service.ts:32 ~ AuthService ~ login ~ error:", error)
            throw error;
        } finally {
            mysqlConnection.end();
            sshConnection.end();
        }

    }

}
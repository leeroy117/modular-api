import { Injectable } from "@nestjs/common";
import ssh2, { Client, ClientChannel, ConnectConfig } from 'ssh2';
import mysql2, { ConnectionOptions, createConnection } from 'mysql2/promise';
import { QueryOptions } from "mysql";
//  type TConnection = {mysql2.Connection & ssh2.Client};
 type TConnection = {
    mysqlConnection: mysql2.Connection,
    sshConnection: ssh2.Client
 };


@Injectable()
export class DatabaseService {

    async invokeQuery(sqlQuery: string, parameters: Array<String>){
        let clientChannel:ClientChannel; 

        let mysqlConfig: ConnectionOptions = {
            user: 'root',
            password: 'UEJdjck5786Ji.',
            database: 'escolar',
            port: 9876,
            stream: typeof clientChannel,
            // multipleStatements: true
        };

        let sshTunnelConfig: ConnectConfig = {
            username: 'agcolleges',
            password: 'AG*-daBhf*98G389+2heTrd*q*KJ+DL.JK+JGA*-Dl-k8asd*gp7',
            host: '164.90.144.135',
            port: 22
        };

        return new Promise( (resolve, reject) => {
            const ssh = new Client();
            try {
            ssh.on('ready',function () {
                ssh.forwardOut(
                    '127.0.0.1',
                    8000,
                    '127.0.0.1',
                // 9876,
                    9876,
                async function (err, stream){
                    
                    (err) && reject(err);
                    
                    try {
                        mysqlConfig.stream = stream;
                        // console.log('holaaaa');
                        
                        // console.log('mysqlConfig', mysqlConfig);
                        
                        const connection = await createConnection(mysqlConfig);

                        // console.log('connection', connection);
                        
                        console.log('parasms', parameters);
                        
                        // const [rows, fields] = await connection.execute(sqlQuery, parameters);
                        const queryOptions: QueryOptions = {
                            sql: sqlQuery,
                            values: parameters
                        };

                        const [rows, fields] = await connection.execute(queryOptions);

                        console.log('rows', {row: rows, fields: fields});
                        
                        connection.end();
                        ssh.end();
                        // console.log('rows', rows[0]);
                        if (typeof (rows[0][0]?.success) !== 'undefined') {
                            resolve({
                                success: false,
                                data: rows[0][0]
                            });
                            return;
                        }
    
                        resolve({
                            success: true,
                            data: rows[0]
                        });

                        return;
                    
                    } catch (error) {
                        ssh.end();
                        reject(error);
                    }
        
                }
                )
            })
                .connect(sshTunnelConfig);
            } catch (error) {
                ssh.end();
                reject(error)
            }
    
        });
    }

    getConnection() : Promise<TConnection> {
        let clientChannel:ClientChannel; 

        let mysqlConfig: ConnectionOptions = {
            user: 'root',
            password: 'UEJdjck5786Ji.',
            database: 'escolar',
            port: 9876,
            stream: typeof clientChannel,
            // multipleStatements: true
        };

        let sshTunnelConfig: ConnectConfig = {
            username: 'agcolleges',
            password: 'AG*-daBhf*98G389+2heTrd*q*KJ+DL.JK+JGA*-Dl-k8asd*gp7',
            host: '164.90.144.135',
            port: 22
        };

        return new Promise( (resolve, reject) => {
            const ssh = new Client();
            try {
            ssh.on('ready',function () {
                ssh.forwardOut(
                    '127.0.0.1',
                    8000,
                    '127.0.0.1',
                // 9876,
                    9876,
                async function (err, stream){
                    
                    if (err){err} ;
                    
                    try {
                        mysqlConfig.stream = stream;
                        
                        // return createConnection(mysqlConfig);
                        const connection = await createConnection(mysqlConfig);
                        // console.log("🚀 ~ file: database.service.ts:136 ~ DatabaseService ~ connection:", connection)
                        const objConnection : TConnection = {
                            mysqlConnection: connection,
                            sshConnection: ssh
                        }
                        resolve(objConnection);
                        // return connection;
                        
                    } catch (error) {
                        // ssh.end();
                        return error;
                        // reject(error);
                    }
        
                }
                )
            })
                .connect(sshTunnelConfig);
            } catch (error) {
                // ssh.end();
                // return error;
                reject(error)
            }
    
        });
    }

    // async invokeConnection(){

    // }
}
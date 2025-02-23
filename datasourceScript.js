const fsExtra = require('fs-extra');
let script = async () => {
    try {
        // 获取所有的环境变量
        let env = process.env;
        let NODE_ENV = env.NODE_ENV ? env.NODE_ENV : 'local';
        // 写入的模板
        let dataSource = `{
                "db": {
                  "name": "db",
                  "connector": "memory"
                },
                "mongo": {
                  "url": "${env.MONGODB_URL || 'mongodb://localhost:27017'}",
                  "database": "${env.MONGODB_DATABASE || 'test'}",
                  "password": "${env.MONGODB_PASSWORD || '123456'}",
                  "name": "mongo",
                  "user": "${env.MONGODB_USER || 'admin'}",
                  "useNewUrlParser": true,
                  "connector": "mongodb"
                }
              }`;
        let writeFileDataSourceConfig = await fsExtra.writeFile(
                `server/datasources.${env.NODE_ENV || 'local'}.json`,
                dataSource
                );
        console.log('writeFileDataSource is ok! %s', JSON.stringify(dataSource));
        setTimeout(()=> { process.exit(1); }, 1000);
    } catch (error) {
        console.log(error);
        setTimeout(()=> { process.exit(1); }, 1000);
    }
};
script();

const fsExtra = require('fs-extra');
let script = async () => {
    try {
        // 获取所有的环境变量
        let env = process.env;
        let memory = '1G';
        let instances = 1;
        if (env.PM2_M) {
            memory = env.PM2_M;
        }
        if (env.PM2_I) {
            instances = env.PM2_I;
        }
        // 转换内存单位
        let nodeMemory = Number(memory.split(/g/gi)[0]) * 1024 * instances;

        let str = '';
        if (env.PM2_DELAY) {
            str = `'restart_delay': ${env.PM2_DELAY},`;
        }

        // 写入的模板
        let dataSource = `
module.exports = {
    apps: [{
        name: 'Hilton_test',
        script: 'server/server.js',
        // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
        args: 'one two',
        instances: ${instances},
        autorestart: true,
        watch: false,
        'interpreter_args': '--max-old-space-size=${nodeMemory} --max-http-header-size=80000',
        'max_memory_restart': '${memory}',
        'log_date_format': 'YYYY-MM-DD HH:mm Z',
        output: '/dev/null',
        error: './logs/error.log',
        'exp_backoff_restart_delay': 200,
        ${str}
    }],
};
`;
        let writeFileDataSourceConfig = await fsExtra.writeFile(
                'ecosystem.config.js',
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

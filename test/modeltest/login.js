let util = require('../_init');
describe('longin', ()=> {
    before(()=> {
        // 在本区块的所有测试用例之前执行
        // console.log('在本区块的所有测试用例之前执行');
    });
    // after(()=> {
    //     // 在本区块的所有测试用例之后执行
    //     // console.log('在本区块的所有测试用例之后执行');
    // });

    // beforeEach(()=> {
    //     // 在本区块的每个测试用例之前执行
    //     // console.log('在本区块的每个测试用例之前执行');
    // });

    // afterEach(()=> {
    //     // 在本区块的每个测试用例之后执行
    //     // console.log('在本区块的每个测试用例之后执行');
    // });
    describe('login test', ()=> {
        it('connector test,should return code 200', (done)=> {
        // console.log('path',__dirname);
            let options = {
                method: 'GET',
                uri: util.serverUrl,
                json: true, // Automatically stringifies the body to JSON
            };
            util.rp(options)
                .then((result)=> {
                    //   // console.log('options', options);

                    //   // console.log('result', result);
                    util.assert(result.error == null, 'request is error');
                    // assert.Equal(body.body.error,null,'接口未成功');
                })
                .catch((err)=> {
                    // POST failed...
                    // console.log(err.statusCode);
                    throw err;
                }).finally((res)=>{
                    // console.log('res=====>', res);
                    done();
                });
        });

        it('login test,should return tocken', (done)=> {
        // console.log('path',__dirname);

            // console.log('path', __dirname);
            let options = {
                method: 'POST',
                body: {
                    'username': util.systemName,
                    'password': util.systemPassword,
                },
                uri: util.serverUrl + 'api/UserBases/login',
                json: true, // Automatically stringifies the body to JSON
            };

            util.rp(options).then((result)=> {
                // console.log('options', options);

                // console.log('result', result);
                util.assert(result.error == null, 'request is error');
                util.assert(result.id != null, 'tocken can not be null');
                // assert.Equal(body.body.error,null,'接口未成功');
            }).catch((err)=> {
                // POST failed...
                // console.log(err.statusCode);
                throw err;
            }).finally(()=>{
                done();
            });
        });

        it('login error test,should return statusCode 401', (done)=> {
            // console.log('path',__dirname);

            // console.log('path', __dirname);
            let options = {
                method: 'POST',
                body: {
                    'username': util.systemName,
                    'password': '12345',
                },
                uri: util.serverUrl + 'api/UserBases/login',
                json: true, // Automatically stringifies the body to JSON
            };

            util.rp(options).then((result)=> {
                // console.log('options', options);

                // console.log('result', result);
                util.assert(result.error != null, '');
                // util.assert(result.id != null, 'tocken can not be null');
            }).catch((err)=> {
                // POST failed...
                // console.log(err.statusCode);
                util.assert(err.statusCode == 401, '');
            }).finally(()=>{
                done();
            });
        });
    });
});

const Mongo = require('loopback-connector-mongodb');

// 等待 MongoDB 服务完全启动
setTimeout(() => {
    const conn = new Mongo();
    conn.connect({url: 'mongodb://admin:admin@localhost:27017'}, (err) => {
        if (err) throw err;

      // 创建普通用户 user1 并设置密码
        const adminDb = conn.db('admin');
        adminDb.createUser({
            user: 'user1',
            pwd: '123456',
            roles: ['readWrite', 'dbAdmin'],  // 赋予读写和数据库管理权限
        }, (err, result) => {
            if (err) console.error('创建用户失败:', err);
            else console.log('用户 user1 创建成功:', result);

        // 创建 test 数据库（如果不存在）
            const testDb = conn.db('test');
            testDb.createCollection('test_collection'); // 可选：创建测试集合

        // 将 test 数据库的所有者设置为 user1
            testDb.command({
                grantRolesToUser: 'user1',
                roles: [{role: 'readWrite', db: 'test'}],
            }, (err, result) => {
                if (err) console.error('授予权限失败:', err);
                else console.log('test 数据库权限分配成功:', result);

          // 关闭连接
                conn.close();
            });
        });
    });
}, 10000); // 延迟 10 秒等待 MongoDB 启动

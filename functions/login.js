const mysql = require('mysql')

exports.handler = (event, context, callback) => {
    let data = JSON.parse(event.body)
    const userName = data.userName;
    const password = data.password;
    if (event.httpMethod !== 'POST') {
        callback(null, {
            statusCode: 501,
            body: JSON.stringify({ message: 'Only POST requests are supported' }),
        })
    } else if (userName === undefined || password === undefined || userName === null || password === null) {
        callback(null, {
            statusCode: 500,
            body: JSON.stringify({ message: '请输入完整账号信息' }),
        })
    } else if (userName.length > 18 || userName.length < 5) {
        callback(null, {
            statusCode: 500,
            body: JSON.stringify({ message: '用户名长度应为5~18个字符' }),
        })
    } else if (!/[a-zA-Z]/.test(userName[0])) { // 2、首字符不是字母
        callback(null, {
            statusCode: 500,
            body: JSON.stringify({ message: '用户名必须是英文开头' }),
        })
    } else if (/\W/.test(userName)) { // 3、用户名必须是数字、字母、下划线组成
        callback(null, {
            statusCode: 500,
            body: JSON.stringify({ message: '用户名必须是数字、字母、下划线组成' }),
        })
    } else if (/\W/.test(password)) {
        callback(null, {
            statusCode: 500,
            body: JSON.stringify({ message: '密码必须是数字、字母、下划线组成' }),
        })
    } else if (password.length > 18 || password.length < 3) {
        callback(null, {
            statusCode: 500,
            body: JSON.stringify({ message: '密码长度应为3~18个字符' }),
        })
    } else {
        const connection = mysql.createConnection({
            host: 'mysql.sqlpub.com',
            user: 'dengxiwang',
            password: '5cb28f7017abd677',
            port: '3306',
            database: 'funtab'
        })

        connection.connect();

        var sql = `SELECT * FROM user WHERE userName = '${userName}' `;

        //查
        connection.query(sql, function (err, result) {
            if (err) {
                callback(null,
                    {
                        statusCode: 500,
                        body: JSON.stringify({ message: err.message }),
                    }
                )
                connection.end();
            } else {
                if (result.length === 0) {
                    callback(null, {
                        statusCode: 500,
                        body: JSON.stringify({ message: '该用户不存在' })
                    })
                    connection.end();
                } else {
                    if (result[0].password === password) {
                        callback(null,
                            {
                                statusCode: 200,
                                body: JSON.stringify({ message: result }),
                            }
                        )
                        connection.end();
                    } else {
                        callback(null,
                            {
                                statusCode: 500,
                                body: JSON.stringify({ message: '密码错误' }),
                            }
                        )
                        connection.end();
                    }
                }
            }
        });
    }
}
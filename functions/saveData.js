const mysql = require('mysql')

exports.handler = (event, context, callback) => {
    let data = JSON.parse(event.body)
    const userName = data.userName;
    const password = data.password;
    const uploadData = data.data.replaceAll(/\\/g,'----')
    if (event.httpMethod !== 'POST') {
        callback(null, {
            statusCode: 501,
            body: JSON.stringify({ message: 'Only POST requests are supported' }),
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
        var updateSql = `UPDATE user SET data = '${uploadData}' WHERE userName = '${userName}'`;

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
                if (uploadData === undefined) {
                    callback(null, {
                        statusCode: 500,
                        body: JSON.stringify({ message: '请求数据不完整' })
                    })
                    connection.end();
                }else if (result.length === 0) {
                    callback(null, {
                        statusCode: 500,
                        body: JSON.stringify({ message: '该用户不存在' })
                    })
                    connection.end();
                } else {
                    if (result[0].password === password) {
                        connection.query(updateSql, function (err, result) {
                            if (err) {
                                callback(null,
                                    {
                                        statusCode: 500,
                                        body: JSON.stringify({ message: err.message }),
                                    }
                                )
                                connection.end();
                            } else {
                                callback(null, {
                                    statusCode: 200,
                                    body: JSON.stringify({ message: '云同步成功' }),
                                })
                                connection.end();
                            }
                        })
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
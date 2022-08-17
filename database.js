const mysql = require("mysql2");
const connection = mysql.createPool({
  user: "root",
  password: "root",
  database: "sign"
})

connection.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log("连接失败:", err);
    } else {
      console.log("数据库连接成功~");
    }
  })
});

module.exports = connection.promise();
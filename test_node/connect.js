const bodyParser = require('body-parser');//解析参数
const express = require('express');
const cors = require('cors');//解决跨域
const mysql = require('mysql');//连接数据库
const app = express();
const router = express.Router();
const option={
    host:'localhost',
    user:'root',
    password:'521297',
    port:'3306',
    database:'test_1',
    connnectTimeout:5000,//连接超时
    multipleStatements:false,//是否允许一个qurey中包含多条sql语句
}
//const conn = mysql.createConnection(option);
app.use(cors());//解决跨域
app.use(bodyParser.json());//json请求
app.use(bodyParser.urlencoded({extended:false}));//表单请求

let pool;
repool();

function Result({code=1,msg='',data={}}){
    this.code = code;
    this.msg = msg;
    this.data = data;
}

//断线重连机制
function repool(){
    pool = mysql.createPool({
        ...option,
        waitForConnections:true,//当无连接池可用时，等待（true）还是抛错（false）
        connectionLimit:100,//连接数限制
        queueLimit:0,//最大连接等待数（0为不限制）
    });//创立连接池
    pool.on('error',err => err.code === 'PORTOCOL_CONNECTION_LOST' && setTimeout(reconn,2000))
}

module.exports = { pool,Result,router,app };

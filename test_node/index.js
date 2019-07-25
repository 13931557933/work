const { app,pool,Result } = require("./connect");
const login = require("./login/index");

app.all('*',(req,res,next) => {
    next();
})

app.all('/',(req,res) => {
    pool.getConnection((err,conn) => {
        res.json({a:"b"})
        conn.release();
    })
})

app.use('/login',login);

app.listen(8080,() => console.log('Server running at http://127.0.0.1:8080/'));


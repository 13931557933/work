const { pool,Result,router } = require('../connect');

router.get('/',(req,res) => {
    pool.getConnection((err,conn) => {
        conn.query('select * from tb_user',(e,r) => res.json(new Result({data:r})));
        conn.release();
    })
})

module.exports = router;
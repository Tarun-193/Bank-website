const exp=require('express');
const db=require('./db_connect');
const path=require('path');
const bodyParser=require('body-parser');
const encoder = bodyParser.urlencoded({ extended: false });

const init=exp();

const public_dir=path.join(__dirname,'./public');
init.use(exp.static(public_dir));

init.set('view engine','ejs');


db.connect((error)=>{
    if(error){
        console.log(error);
    }
    else
    console.log("mysql connected");
});

init.use('/',require('./routes/pages'));


init.post("/details",encoder,(req,res)=>{
    console.log('inside post');
    accno=req.body.accno;
    pass=req.body.pass;
    db.query("select * from bank_customers where accno=? and password=?",[accno,pass],(err,result)=>{
         if (err) {
             console.log(err);
             res.end(`<h1>Oops!,Some error has occured!</h1><a href='/'>Login page</a>`);
         }
        else if(result.length>0){
            console.log(result);
            db.query('select * from user_info where accno=?',[accno],(err,result1)=>{
                    if(err){
                        console.log(err);
                        console.log('some error');
                    }
                    else
                    console.log(result1);
                    res.render('welcome',{info:{accno:result1[0].Accno,name:result1[0].name,age:result1[0].age,email:result1[0].email,phone:result1[0].phone,address:result1[0].address,image:result1[0].image}});
            })
        }
        else res.send(`<h1>Enter valid details!<h1><a href='/'>Go to login page</a>`);
    });
})

init.get('/balance',(req,res)=>{
    db.query('select balance from user_info where accno=?',[accno],(err,result2)=>{
        if(err){
            console.log(err);
            console.log('some error');
        }
        else if(result2.length>0){
            console.log(result2);
            res.render('balance',{balance:result2[0].balance});
        }
});
})


init.listen(3000);

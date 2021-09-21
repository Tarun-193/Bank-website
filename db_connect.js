const mysql=require('mysql');
const env=require('dotenv');
env.config({path:'./.env'});
const db=mysql.createConnection({

    host:process.env.Database_host,
    user:process.env.Database_user,
    password:process.env.Database_password,
    database:process.env.Database
    // connectionlimit:10
});

module.exports=db;

// const firebase=require('firebase');

// const db=firebase.initializeApp({
//     apiKey:"",
//     authDomain:"bankwebsite-f0fcc.firebaseapp.com",
//     databaseURL:"https://bankwebsite-f0fcc-default-rtdb.firebaseio.com/",
// });

// module.exports=db;
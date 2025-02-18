const mongoose = require('mongoose');

const connectDb = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.DB_STRING);
        console.log("Database Connected:",connect.connection.host,"\n",connect.connection.name)
    }catch(err){
        console.log(err);
        process.exit(1);
    }finally{
        console.log("DB Working");
    }
}

module.exports = connectDb;

const mongoose = require('mongoose');
const {DB_URL} = require('../common/config')

mongoose.set('strictQuery',false);


async function main(){
    await mongoose.connect(DB_URL);
}

main().catch((err)=> console.error(err))
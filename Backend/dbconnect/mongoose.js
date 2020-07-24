mongoose = require('mongoose');

module.exports = function () {
    mongoose.Promise = global.Promise;
    var db = mongoose.connect("mongodb+srv://dbUser:"+
                                process.env.MONGO_ATLAS_PW
                                +"@cluster0.ykeib.mongodb.net/MusicAppDB?retryWrites=true&w=majority",
                                    { 
                                        promiseLibrary: global.Promise,
                                        useNewUrlParser: true,
                                        useUnifiedTopology: true 
                                    }
                            );

    mongoose.connection.on('error', function (err) {
        console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
    }).on('open', function () {
        console.log('Connection established with MongoDB')
    })
    
    return db;
};

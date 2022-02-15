const { connect, connection } = require('mongoose');


const connectionMessage = 
process.env.MONGODB_URI || 'mongodb://localhost:27017/socialDB';

connect(connectionMessage, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;
const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const config = require('config');
const cors = require('cors');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        })
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();

const dbConnection = mongoose.connection;
dbConnection.on('error', (err)=>console.log('Connection error: ', err));
dbConnection.once('open', ()=>console.log('Connected to DB'));

const app = express();
app.use(cors());


app.use('/graphql', graphqlHTTP({
    graphiql:true,
    schema
}));


const PORT = config.get('port') || 5000;

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));
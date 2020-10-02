
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/WebAssignment1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
  
mongoose.connection
    .on('open', () => {
        console.log('Mongoose connection open');
    })
    .on('error', (err) => {
        console.log(`Connection error: ${err.message}`);
});

require('./models/Registratio');
const app = require('./app');
const server = app.listen(4000, () => {
    console.log(`Express is running on port ${server.address().port}`);
});
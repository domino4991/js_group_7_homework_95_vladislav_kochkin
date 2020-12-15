const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    database: `mongodb://localhost/cocktailsDB`,
    databaseOpt: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    facebookAccess: '181475880365199',
    facebookSecret: 'a315d408367770a1aaba62af405163e9'
};
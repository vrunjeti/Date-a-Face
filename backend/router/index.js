module.exports = function (app) {
    app.use('/auth', require('./routes/auth'));
    app.use('/sql', require('./routes/sql'));
};
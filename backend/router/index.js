module.exports = function (app) {
    app.use('/adv', require('./routes/adv'));
    app.use('/auth', require('./routes/auth'));
    app.use('/sql', require('./routes/sql'));
};
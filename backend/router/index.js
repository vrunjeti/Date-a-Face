module.exports = function (app) {
    // like app.use(', router');
    app.use('/sql', require('./routes/sql'));
};
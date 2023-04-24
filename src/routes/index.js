const homeRouter = require('./home');
const newsRouter = require('./news');
const siteRouter = require('./site');
const loginRouter = require('./login');
const registerRouter = require('./register');
const buyticketstep2Router = require('./buyticketstep2');
const buyticketstep3Router = require('./buyticketstep3');
const buyticketstep4Router = require('./buyticketstep4');
const historybuyticketRouter = require('./historybuyticket');
const contactRouter = require('./contact');
const changepasswordRouter = require('./changepassword');
const updateinfoRouter = require('./updateinfo');


const showlistcus = require('./admin-show-list-cus');
const deletecus = require('./admin-delete-cus');
const showlistschedule = require('./admin-show-list-schedule');
const deleteschedule = require('./admin-delete-schedule');
const createschedule = require('./admin-create-schedule');
const editschedule = require('./admin-edit-schedule');
const detailstatistics = require('./admin-ct-tkdt');
const detailSales = require('./admin-ct-tkds');
const showlistnews = require('./admin-show-news');
const createnews = require('./admin-create-news');
const editnews = require('./admin-edit-news');
const deletenews = require('./admin-delete-news');
const sales = require('./admin-sales');
const statistics = require('./admin-statistics');

const { register } = require('../app/controllers/RegisterController');

function route(app) {

    app.use('/admin', statistics);
    app.use('/admin', sales);
    app.use('/admin', deletenews);
    app.use('/admin', editnews);
    app.use('/admin', createnews);
    app.use('/admin', showlistnews);
    app.use('/admin', detailSales);
    app.use('/admin', detailstatistics);
    app.use('/admin', editschedule);
    app.use('/admin', createschedule);
    app.use('/admin', deleteschedule);
    app.use('/admin', showlistschedule);
    app.use('/admin', deletecus);
    app.use('/admin', showlistcus);

    app.use('/', homeRouter);
    app.use('/updateinfo', updateinfoRouter);
    app.use('/change-password', changepasswordRouter);
    app.use('/contact', contactRouter);
    app.use('/history-buy-ticket', historybuyticketRouter);
    app.use('/buy-ticket-step4', buyticketstep4Router);
    app.use('/buy-ticket-step3', buyticketstep3Router);
    app.use('/buy-ticket-step2', buyticketstep2Router);
    app.use('/register', registerRouter);
    app.use('/login', loginRouter);
    app.use('/news', newsRouter);
    app.use('/', siteRouter);
}

module.exports = route;

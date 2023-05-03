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
const detailstatistics_quarter = require('./admin-ct-tkdt-quy');
const detailstatistics_month = require('./admin-ct-tkdt-thang');
const detailSales_month = require('./admin-ct-tkds-thang');
const detailSales_quarter = require('./admin-ct-tkds-quy');
const showlistnews = require('./admin-show-news');
const createnews = require('./admin-create-news');
const editnews = require('./admin-edit-news');
const deletenews = require('./admin-delete-news');
const sales = require('./admin-sales');
const statistics = require('./admin-statistics');

const { register } = require('../app/controllers/RegisterController');

const authMiddleware = require('../middleware/auth');

function route(app) {

    

    app.use('/admin', authMiddleware.auth ,statistics);
    app.use('/admin', authMiddleware.auth, sales);
    app.use('/admin', authMiddleware.auth, deletenews);
    app.use('/admin', authMiddleware.auth, editnews);
    app.use('/admin', authMiddleware.auth, createnews);
    app.use('/admin', authMiddleware.auth, showlistnews);
    app.use('/admin', authMiddleware.auth, detailSales_month);
    app.use('/admin', authMiddleware.auth, detailSales_quarter);
    app.use('/admin', authMiddleware.auth, detailstatistics_month);
    app.use('/admin', authMiddleware.auth, detailstatistics_quarter);
    app.use('/admin', authMiddleware.auth, editschedule);
    app.use('/admin', authMiddleware.auth, createschedule);
    app.use('/admin', authMiddleware.auth, deleteschedule);
    app.use('/admin', authMiddleware.auth, showlistschedule);
    app.use('/admin', authMiddleware.auth, deletecus);
    app.use('/admin', authMiddleware.auth, showlistcus);

    app.use('/', homeRouter);
    app.use('/updateinfo', authMiddleware.auth, updateinfoRouter);
    app.use('/change-password', authMiddleware.auth, changepasswordRouter);
    app.use('/contact', contactRouter);
    app.use('/history-buy-ticket', authMiddleware.auth, historybuyticketRouter);
    app.use('/buy-ticket-step4', authMiddleware.auth, buyticketstep4Router);
    app.use('/buy-ticket-step3', authMiddleware.auth, buyticketstep3Router);
    app.use('/buy-ticket-step2', buyticketstep2Router);
    app.use('/register', registerRouter);
    app.use('/login', loginRouter);
    app.use('/news', newsRouter);
    app.use('/', siteRouter);
}

module.exports = route;

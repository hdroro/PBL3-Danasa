const Home = require('../models/Home');
class HomeController {

    // [GET] /home
    index(req, res) {
        const passedVariable = req.session.nameCustomer;
        if(passedVariable != null) {
            const obj = {
                title: 'Trang chủ',
                infoLogin: passedVariable, 
            }
            res.render('home', obj);
        } else {
            const obj = {
                title: 'Trang chủ',
                infoLogin: 'Đăng nhập', 
            }
            res.render('home', obj);
        }
    }

    //[GET]/course/:slug
    async searchDate(req, res) {
        const { from, to, date } = req.body;
        const home = new Home(from, to, date);
        console.log(home)
        console.log("_______")

        const home_search = await home.search();
        console.log(home_search)
        res.redirect('/buy-ticket-step2?from=' + home_search.idStartProvince + '&to=' + home_search.idEndProvince)
    }
}

module.exports = new HomeController;
class BuyTicket4Controller{

    // [GET] /buy-ticket-step2
    index(req, res){
        const passedVariable = req.session.nameCustomer;
        if(passedVariable != null) {
            const obj = {
                title: 'Đặt vé xe',
                infoLogin: passedVariable, 
            }
            res.render('buyticketstep4', obj);
        } else {
            const obj = {
                title: 'Đặt vé xe',
                infoLogin: 'Đăng nhập', 
            }
            res.render('buyticketstep4', obj);
        }
        // res.render('buyticketstep4');
    }

    //[GET]/buy-ticket-step2/:slug
    show(req, res){
        res.send('Detail');
    }
}

module.exports = new BuyTicket4Controller;
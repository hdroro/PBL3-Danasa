class BuyTicket2Controller{

    // [GET] /histor-buy-ticket
    index(req, res){
        const passedVariable = req.session.userName;
        if(passedVariable != null) {
            const obj = {
                title: 'Đặt vé xe',
                infoLogin: passedVariable, 
            }
            res.render('buyticketstep2', obj);
        } else {
            const obj = {
                title: 'Đặt vé xe',
                infoLogin: 'Đăng nhập', 
            }
            res.render('buyticketstep2', obj);
        }
        // res.render('buyticketstep2');
    }

    //[GET]/buy-ticket-step2/:slug
    show(req, res){
        res.send('Detail');
    }
}

module.exports = new BuyTicket2Controller;
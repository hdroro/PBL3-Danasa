class HistoryBuyTicketController{

    // [GET] /buy-ticket-step2
    index(req, res){
        // const obj = {
        //     infoLogin: 'Đăng nhập', 
        // }
        // res.render('historybuyticket', obj);
        const passedVariable = req.session.nameCustomer;
        if(passedVariable != null) {
            const obj = {
                title: 'Lịch sử đặt vé xe',
                infoLogin: passedVariable, 
            }
            res.render('historybuyticket', obj);
        } 
    }

    //[GET]/buy-ticket-step2/:slug
    show(req, res){
        res.send('Detail');
    }
}

module.exports = new HistoryBuyTicketController;
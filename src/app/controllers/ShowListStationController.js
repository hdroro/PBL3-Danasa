class ShowListStationController {
    index(req,res){
        const obj = {
            title: 'Xem bến xe',
          }
          res.render('admin-xemBen', obj);
    }
}
module.exports = new ShowListStationController;
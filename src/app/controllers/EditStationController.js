class EditStationController{
    index(req,res){
        const obj = {
            title: 'Xóa bến xe',
          }
          res.render('admin-xoaBen', obj);
    }
}
module.exports = new EditStationController;
class EditStationController{
    index(req,res){
        const obj = {
            title: 'Sửa bến xe',
          }
          res.render('admin-suaBen', obj);
    }
}
module.exports = new EditStationController;
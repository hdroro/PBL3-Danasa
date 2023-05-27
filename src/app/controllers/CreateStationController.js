class CreateScheduleController{
    index(req,res){
        const obj = {
            title: 'Thêm bến xe',
          }
          res.render('admin-taoBen', obj);
    }
}
module.exports = new CreateScheduleController;
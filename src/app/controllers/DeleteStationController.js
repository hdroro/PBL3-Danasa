const Station = require("../models/Station");
class DeleteStationController{
    index(req,res){
        const id = req.params.id;
        new Station().getInfoStationById(id)
            .then((station)=>{
                if(station == null) res.json("Lỗi");
                else res.render('admin-xoaBen',{
                    title: 'Xóa bến xe',
                    station: station,
                })
            })
            .catch(err => console.error(err))
    }
    delete(req,res){
        const id = req.params.id;
        new Station().deleteStation(id)
            .then(()=>{
                res.redirect('/admin/list-station');
            })
            .catch(err => console.error(err))
    }
}
module.exports = new DeleteStationController;
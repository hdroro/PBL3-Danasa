const Station = require("../models/Station");
class EditStationController{
    index(req,res){
        const id = req.params.id;
        new Station().getInfoStationById(id)
            .then((station)=>{
                if(station == null) res.json("Lỗi");
                else res.render('admin-suaBen',{
                    title: 'Sửa bến xe',
                    station: station,
                })
            })
            .catch(err => console.error(err))
    }
    edit(req,res){
        const id = req.params.id;
        const nameStation = req.body["namestation"];
        var check = true;
        new Station().getAllStationByIdStation(id)
            .then((stations)=>{
                for(var x of stations){
                    if(x.idStation == id) continue;
                    if(x.stationName == nameStation) {
                        check = false;
                        break;
                    }
                }
                    //success
                return new Promise(function(resolve,reject){
                    if(check) return resolve();
                    else return reject();
                }) 
            })
            .then(()=>{
                new Station().editStation(id,nameStation)
            })
            .then(()=>{
                res.redirect('/admin/list-station');
            })
            .catch(err => {
                if(!check) res.redirect(`/admin/edit-station/${id}/fail`);
                else console.error(err)
            })
    }
    fail(req,res){
        const id = req.params.id;
        new Station().getInfoStationById(id)
            .then((station)=>{
                if(station == null) res.json("Lỗi");
                else res.render('admin-suaBen',{
                    title: 'Sửa bến xe',
                    station: station,
                    message: 'Tên bến xe đã tồn tại',
                })
            })
            .catch(err => console.error(err))
    }
}
module.exports = new EditStationController;
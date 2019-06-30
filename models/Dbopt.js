/**
 * 数据库相关操作
 * */
const  url = require('url');
const  crypto = require('crypto'); //加密类
const mongoose = require('mongoose');
const shortid = require('shortid');

// 站点配置
const settings = require('./db/settings');
const db = mongoose.connect(settings.URL);
console.log('数据库连接成功！');
// mongoose.connect('mongodb://'+settings.USERNAME+':'+settings.PASSWORD+'@'+settings.HOST+':'+settings.PORT+'/'+settings.DB+'');

// 数据库操作对象
const  DbOpt = {
    // 信息删除操作
    del: function (obj, req, res, logMsg) {
        const targetId = req.body._id;
        if(shortid.isValid(targetId)){
            obj.remove({_id : req.body._id}, function (err, result) {
                if(err){
                    res.json({success: false,error: true,msg: err});
                }else{
                    console.log(result+" success!");
                    res.json({success:true,error:false,msg:'删除成功'});
                }
            })
        }else {
            res.json({success:false,error:true,msg:settings.system_illegal_param});
        }
    },
    // 根据id查找单条记录
    findOne: function (obj, req, res, logMsg) {
        const params = url.parse(req.url,true);
        const targetId = params.query.uid;
        if( shortid.isValid(targetId) ) {
            obj.findOne({_id : targetId}, function (err,result) {
                if( err) {
                    res.next(err);
                } else {
                    console.log(result+' success');
                    return res.json(result);
                }
            })
        } else {
            res.json(settings.system_illegal_param);
        }
    },
    // 单个添加
    addOne: function (obj, req, res, logMsg) {
        const newObj = new obj(req.body);
        newObj.save(function (err) {
            if (err) {
                res.json({success:false,error:true,msg:err});
                console.log(err);
            } else {
                res.json({success:true,error:false,msg:'信息添加成功'});
            }
        })
    },
    // 根据id更新单条数据
    updateById: function (obj, req, res, logMsg) {
        const targetId = req.body._id;
        if ( shortid.isValid(targetId) ) {
            const conditions = {_id: targetId};
            req.body.updateDate = new Date();
            const update = {$set: req.body};
            obj.update(conditions, update, function(err,result) {
                if (err) {
                    console.log('dberr:', err);
                    res.json({success: false, error: true, msg: err});
                } else {
                    console.log(logMsg + ' success!' + result);
                    console.log(result);
                    res.json({success: true, error: false, msg: '信息修改成功'});
                }
            })
        } else {
            res.json({success:false,error:true,msg:settings.system_illegal_param});
        }
    }
}

module.exports = DbOpt;
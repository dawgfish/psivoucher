'user strict';
var sql = require('./db.js');

//Voucher object constructor
var Voucher = function(voucher){
    this.voucher = voucher.voucher;
    this.status = voucher.status;
    this.created_at = new Date();
};

Voucher.createVoucher = function createVoucher(newVoucher, result) {    
        sql.query("INSERT INTO vouchers set ?", [newVoucher], function (err, res) {
               if(err) {
                    console.log("error: ", err);
                    result(err, null);
               } else {
                    console.log(res.insertId);
                    result(null, res.insertId);
               }
          });           
};

Voucher.getVoucherById = function getVoucherById(voucherId, result) {
        sql.query("Select voucher from vouchers where voucher_id = ? ", voucherId, function (err, res) {             
               if(err) {
                    console.log("error: ", err);
                    result(err, null);
               } else {
                    result(null, res);
               }
         });   
};

Voucher.getAllVoucher = function getAllVoucher(result) {
        sql.query("Select * from vouchers", function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                } else{
                    console.log('vouchers : ', res);  
                    result(null, res);
                }
        });   
};

Voucher.updateById = function updateById(id, voucher, dt, result){
       sql.query("UPDATE vouchers SET assessment=?, learner=?, persona=?, assigned=? WHERE voucher_id=? ", 
                                      [voucher.assessment, voucher.learner, voucher.persona, dt, id], function (err, res) {
               if(err) {
                   console.log("error: ", err);
                   result(null, err);
               } else{   
                   result(null, res);
               }
       }); 
};

Voucher.remove = function deleteVoucher(id, result){
       sql.query("DELETE FROM vouchers WHERE voucher_id = ?", [id], function (err, res) {
               if(err) {
                   console.log("error: ", err);
                   result(null, err);
               } else{
                   result(null, res);
               }
       }); 
};

Voucher.getVoucherByLearnerId = function getVoucherByLearnerId(learnerId, testId, result) {
        sql.query("Select voucher from vouchers where learner = ? and assessment = ? ", [learnerId,testId], function (err, res) {
               if(err) {
                    console.log("error: ", err);
                    result(err, null);
               } else {
                    result(null, res);
               }
         });
};

Voucher.getUnassignedVoucher = function getUnassignedVoucher(result) {
        sql.query("Select voucher_id, voucher from vouchers where learner = '' ", function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                } else{
                    console.log('vouchers : ', res);
                    result(null, res);
                }
        });
};

Voucher.getAssignedVoucher = function getAssignedVoucher(result) {
        sql.query("Select * from vouchers where learner != '' ", function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                } else{
                    console.log('vouchers : ', res);
                    result(null, res);
                }
        });
};



module.exports= Voucher;


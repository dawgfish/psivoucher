'use strict';

var Voucher = require('../model/appModel.js');

exports.list_all_vouchers = function(req, res) {
  Voucher.getAllVoucher(function(err, voucher) {
    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', voucher);
    res.send(voucher);
  });
};

exports.create_a_voucher = function(req, res) {
   var newVoucher = req.body;

   if(!newVoucher.learner || !newVoucher.assessment || !newVoucher.persona) {
         res.status(400).send({ error:true, message: 'Please provide: voucher.learner, voucher.assessment, voucher.persona'});
   } else {
         Voucher.createVoucher(newVoucher, function(err, voucher) {
            if (err)
               res.send(err);
            res.json(voucher);
         });
   }
};

exports.read_a_voucher = function(req, res) {
  Voucher.getVoucherById(req.params.voucherId, function(err, voucher) {
    if (err)
      res.send(err);
    res.json(voucher);
  });
};

exports.update_a_voucher = function(req, res) {
  var newVoucher = req.body;
  var dt = new Date().toISOString().slice(0,19).replace('T', ' ');

  if(!newVoucher.learner || !newVoucher.persona || !newVoucher.assessment){
         res.status(400).send({ error:true, message: 'Please provide: voucher.learner, voucher.persona, voucher.assessment'});
  } else { 
     Voucher.updateById(req.params.voucherId, newVoucher, dt, function(err, voucher) {
        if (err)
          res.send(err);
        res.json(voucher);
     });
  }
};

exports.delete_a_voucher = function(req, res) {
  Voucher.remove( req.params.voucherId, function(err, voucher) {
    if (err)
      res.send(err);
    res.json({ message: 'Voucher successfully deleted' });
  });
};

exports.read_a_voucher_by_learner = function(req, res) {
  Voucher.getVoucherByLearnerId(req.params.learnerId, req.params.testId, function(err, voucher) {
    if (err)
      res.send(err);
    res.json(voucher);
  });
};

exports.list_unassigned_vouchers = function(req, res) {
  Voucher.getUnassignedVoucher(function(err, voucher) {
    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', voucher);
    res.send(voucher);
  });
};

exports.list_assigned_vouchers = function(req, res) {
  Voucher.getAssignedVoucher(function(err, voucher) {
    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', voucher);
    res.send(voucher);
  });
};


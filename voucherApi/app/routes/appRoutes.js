'use strict';

module.exports = function(app) {
  var voucher = require('../controller/appController');

  // voucher Routes
  app.route('/api/v1/vouchers')
    .get(voucher.list_all_vouchers)
    .post(voucher.create_a_voucher);
   
  app.route('/api/v1/vouchers/:voucherId')
    .get(voucher.read_a_voucher)
    .put(voucher.update_a_voucher)
    .delete(voucher.delete_a_voucher);

  app.route('/api/v1/vouchers/:learnerId/:testId')
    .get(voucher.read_a_voucher_by_learner);

  app.route('/api/v1/unassigned/vouchers')
    .get(voucher.list_unassigned_vouchers);

  app.route('/api/v1/assigned/vouchers')
    .get(voucher.list_assigned_vouchers);

};

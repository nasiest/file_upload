'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('job_types', [
      {
        job_type: 'Contract'
      },
      {
        job_type: 'Permanent'
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
   return queryInterface.bulkDelete('job_types',{}, null);
  }
};

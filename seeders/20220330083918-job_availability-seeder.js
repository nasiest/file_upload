'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('job_availabilities', [
      {
        job_availability: 'Onsite'
      },
      {
        job_availability: 'Remote'
      },
      {
        job_availability: 'Hybrid'
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
   return queryInterface.bulkDelete('job_availabilities',{}, null);
  }
};

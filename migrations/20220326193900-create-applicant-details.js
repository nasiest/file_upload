'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Applicant_Details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // applicant_id: {
      //   type: Sequelize.INTEGER
      // },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email_address: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      job_role: {
        type: Sequelize.STRING
      },
      notice_period: {
        type: Sequelize.STRING
      },
      salary: {
        type: Sequelize.STRING(1234)
      },
      experience: {
        type: Sequelize.STRING
      },
      resume: {
        type: Sequelize.STRING
      },
      cover_letter: {
        type: Sequelize.STRING
      },
      availabilty: {
        type: Sequelize.STRING
      },
      contract_type: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Applicant_Details');
  }
};
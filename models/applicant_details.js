'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Applicant_Details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Applicant_Details.init({
    applicant_id: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email_address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    country: DataTypes.STRING,
    job_role: DataTypes.STRING,
    notice_period: DataTypes.STRING,
    salary: DataTypes.STRING(1234),
    experience: DataTypes.STRING,
    resume: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Applicant_Details',
  });
  return Applicant_Details;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job_Type extends Model {
  
    static associate(models) {
      // define association here
    }
  }
  Job_Type.init({
    job_type_id: DataTypes.INTEGER,
    // applicant_id: DataTypes.INTEGER,
    job_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Job_Type',
  });
  return Job_Type;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job_Availability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Job_Availability.init({
    // availabilty_id: DataTypes.INTEGER,
    // applicant_id: DataTypes.INTEGER,
    job_availability: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Job_Availability',
  });
  return Job_Availability;
};
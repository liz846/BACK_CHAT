const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  companyDescription: String,
  policy: String,
  vision: String,
  mission: String,
  objectives: String,
  values: String,

  address: {
    fullAddress: String
  },

  schedule: {
    weekdays: String
  }
});

module.exports = mongoose.model('Company', CompanySchema);

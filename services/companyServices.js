const Company = require('../model/companyModel');

class CompanyService {
  async create(data) {
    return await Company.create(data);
  }

  async get() {
    return await Company.findOne();
  }

  async update(data) {
    return await Company.findOneAndUpdate({}, data, { new: true });
  }

  async delete() {
    return await Company.findOneAndDelete();
  }
}

module.exports = new CompanyService();

class Getdata {
  constructor(model) {
    this.model = model;
  }
  get_data = async () => {
    return await this.data.find();
  };
}

module.exports = Getdata;

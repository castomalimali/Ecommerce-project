class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  // search ?keyword = ...
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", //case insensitive
          },
        }
      : {};
    console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }
  //filter items
  filter() {
    const queryCopy = { ...this.queryStr };
    //removing fileds from the query
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((el) => {
      delete queryCopy[el];
    });

    //Advance filte for price, rating and more
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => '$'+match);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query = this.query.skip(skip).limit(resPerPage);
    return this;
  }
}

module.exports = APIFeatures;

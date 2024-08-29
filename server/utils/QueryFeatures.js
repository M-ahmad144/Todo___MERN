const Tag = require("../models/TagModel");

class QueryFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = [
      "page",
      "limit",
      "fields",
      "sort",
      "status",
      "priority",
      "tag",
    ];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj); // converting query object to string
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" "); // "name or createdAt"
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    //return this for method chaining
    return this;
  }
  limitedFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields); //?fields=name,email => select("name email")
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 10;
    const skip = (page - 1) * limit; // page=3, limit=10, skip=20
    this.query = this.query.skip(skip).limit(limit); //?page=3&limit=10 => skip=20, limit=10
    return this;
  }

  filterByStatus() {
    if (this.queryString.status) {
      const status = this.queryString.status.split(",").join(" "); // "pending or overdue or today"
      this.query = this.query.where({ status }); //?status=pending => where({status: "pending"})
    }

    return this;
  }

  filterByPriority() {
    if (this.queryString.priority) {
      const priority = this.queryString.priority.split(",").join(" "); // "low or medium or high"
      this.query = this.query.where({ priority }); //?priority=low => where({priority: "low"})
    }

    return this;
  }

  async filterByTag() {
    if (this.queryString.tag) {
      const tag = await Tag.findOne({ name: this.queryString.tag });
      if (tag) {
        this.query = this.query.where({ tag: tag._id }); //field matches the _id of the found tag
      }
    }
  }
}

module.exports = QueryFeatures;

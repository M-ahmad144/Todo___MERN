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
      "dueDate",
    ];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitedFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  filterTodosByStatus() {
    if (this.queryString.status) {
      const status = this.queryString.status.toLowerCase();

      if (status === "completed") {
        this.query = this.query.where({ completed: true });
      } else if (status === "pending") {
        this.query = this.query.where({ completed: false });
      } else if (status === "overdue") {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to start of today

        this.query = this.query
          .where({ completed: false })
          .where("dueDate")
          .lt(today); // Date is less than today (i.e., overdue)
      } else if (status === "today") {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        this.query = this.query
          .where({ completed: false })
          .where("dueDate")
          .gte(startOfDay)
          .lt(endOfDay);
      }
    }
    return this;
  }

  filterByPriority() {
    if (this.queryString.priority) {
      const priority = this.queryString.priority.split(",").join(" ");
      this.query = this.query.where({ priority });
    }
    return this;
  }

  async filterByTag() {
    if (this.queryString.tag) {
      const tag = await Tag.findOne({ name: this.queryString.tag });
      if (tag) {
        this.query = this.query.where({ tag: tag._id });
      }
    }
    return this;
  }
}

module.exports = QueryFeatures;

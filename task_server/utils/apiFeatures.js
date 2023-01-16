class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // QUERY FOR SOME OF THE FIELDS
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");

      this.query = this.query.select(fields);
    }

    this.query = this.query.select("-__v");

    return this;
  }
}

module.exports = APIFeatures;

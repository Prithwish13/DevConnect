const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");
const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
const getAsync = util.promisify(client.hget).bind(client);

const exec = mongoose.Query.prototype.exec;

//implementing a .cache function to cached a perticular query
mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");
  //for chainable function
  return this;
};

//we need to use function keyword not an arrow function,I am gonna overwrite the exec function.
mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }
  console.log("cached");
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );
  //see if we have a value for key in redis.
  const cachedValue = await getAsync(this.hashKey, key);
  //If we do,return that.
  if (cachedValue) {
    // const doc = new this.model(JSON.parse(cachedValue));
    const doc = JSON.parse(cachedValue);
    if (Array.isArray(doc)) {
      return doc.map((d) => new this.model(d));
    } else {
      return new this.model(doc);
    }
  }

  //Otherwise, issue the query.
  const result = await exec.apply(this, arguments);
  client.hset(this.hashKey, key, JSON.stringify(result));
  return result;
};

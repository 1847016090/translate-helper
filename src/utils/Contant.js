let apiPrefix = "http://112.74.181.151:3000";

if (process.env.NODE_ENV === "development") {
  apiPrefix = "http://112.74.181.151:3000";
} else {
  apiPrefix = "112.74.181.151:3000";
}

const judgeType = data => {
  return Object.prototype.toString.call(data).slice(8, -1);
};

String.prototype.format = function(obj) {
  var str = this;
  var newStr = "";
  if (judgeType(obj) === "Object" && JSON.stringify(obj) !== "{}") {
    Object.entries(obj).forEach(module => {
      const [key, value] = module;
      newStr = str.replace(`{${key}}`, value);
    });
  }
  return newStr;
};
const user = {
  login: apiPrefix + "/user/login",
  modules: apiPrefix + "/user/modules",
  moduleArticle: apiPrefix + "/user/articles/{moduleKey}",
  articleInfo: apiPrefix + "/user/articles/info/{id}",
  article: {
    move: apiPrefix + "/user/articles/move",
    delete: apiPrefix + "/user/articles/{id}",
    edit: apiPrefix + "/user/articles/{id}"
  }
};

export default user;

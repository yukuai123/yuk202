//因为生产环境的接口和方法可能和实际中的不一样
//所以尽量使用外部管理访问接口的方法。

//messageWrite
export const addMsg = function (content,param, callback) {
  content.$ajax('post', 'addMsg', param, callback);
};

//pageHeader
export const getUserInfo = function (content,param, callback) {
  content.$ajax('get', 'getUserInfo', param, callback);
};

//slide
export const getTag = function (content,param, callback) {
  content.$ajax('get', 'getTag', param, callback);
};

export const getClassify = function (content,param, callback) {
  content.$ajax('get', 'getClassify', param, callback);
};

//slide and indexList and arrange
export const getPage = function (content,param, callback) {
  content.$ajax('get', 'getPage', param, callback);
};


//pageDetail
export const getPageById = function (content,param, callback) {
  content.$ajax('post', 'getPageById', param, callback);
};

//pageDetail and messageBoard
export const getMessage = function (content,param, callback) {
  content.$ajax('post', 'getMessage', param, callback);
};

//arrange
export const getPageByClassify = function (content,param, callback) {
  content.$ajax('post', 'getPageByClassify', param, callback);
};

export const getPageByTag = function (content,param, callback) {
  content.$ajax('post', 'getPageByTag', param, callback);
};


//about
export const getAbout = function (content,param, callback) {
  content.$ajax('get', 'getAbout', param, callback);
};


export const login = function (content,param, callback) {
  content.$ajax('post', 'login', param, callback);
};

export const getAllPage = function (content,param, callback) {
  content.$ajax('get', 'getAllPage', param, callback);
};

export const changeSetting = function (content,param, callback) {
  content.$ajax('post', 'changeSetting', param, callback);
};

export const getUserInfo = function (content,param, callback) {
  content.$ajax('get', 'getUserInfo', param, callback);
};


//about
export const addAbout = function (content,param, callback) {
  content.$ajax('post', 'addAbout', param, callback);
};

export const getAbout = function (content,param, callback) {
  content.$ajax('get', 'getAbout', param, callback);
};

//label
export const removeClassify = function (content,param, callback) {
  content.$ajax('post', 'removeClassify', param, callback);
};

export const addClassify = function (content,param, callback) {
  content.$ajax('post', 'addClassify', param, callback);
};

export const getPageByClassify = function (content,param, callback) {
  content.$ajax('post', 'getPageByClassify', param, callback);
};



export const removeTag = function (content,param, callback) {
  content.$ajax('post', 'removeTag', param, callback);
};

export const addTag = function (content,param, callback) {
  content.$ajax('post', 'addTag', param, callback);
};


export const getPageByTag = function (content,param, callback) {
  content.$ajax('post', 'getPageByTag', param, callback);
};

export const getTag = function (content,param, callback) {
  content.$ajax('get', 'getTag', param, callback);
};

export const getClassify = function (content,param, callback) {
  content.$ajax('get', 'getClassify', param, callback);
};

//page list
export const switchPageStatus= function (content,param, callback) {
  content.$ajax('post', 'switchPageStatus', param, callback);
};

//page addPage

export const updatePage= function (content,param, callback) {
  content.$ajax('post', 'updatePage', param, callback);
};

export const addPage = function (content,param, callback) {
  content.$ajax('post', 'addPage', param, callback);
};


export const getAllPageById = function (content,param, callback) {
  content.$ajax('post', 'getAllPageById', param, callback);
};

export const getAllMsg = function (content,param, callback) {
  content.$ajax('get', 'getAllMsg', param, callback);
};


export const getMsgById = function (content,param, callback) {
  content.$ajax('post', 'getMsgById', param, callback);
};


export const switchMsgStatus = function (content,param, callback) {
  content.$ajax('post', 'switchMsgStatus', param, callback);
};


//messageWrite
export const addMsg = function (content,param, callback) {
  content.$ajax('post', 'addMsg', param, callback);
};



// //slide and indexList and arrange
// export const getPage = function (content,param, callback) {
//   content.$ajax('get', 'getPage', param, callback);
// };
//
//
// //pageDetail
// export const getPageById = function (content,param, callback) {
//   content.$ajax('post', 'getPageById', param, callback);
// };
//
// //pageDetail and messageBoard
// export const getMessage = function (content,param, callback) {
//   content.$ajax('post', 'getMessage', param, callback);
// };


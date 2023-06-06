const api = 'http://192.168.2.23:48081'//测试地址

const variable = {
  login: api + '/api/login',
  register: api + '/api/register',
  saveData: api + '/api/saveData',
  getData: api + '/api/getData',
  getUserInfo: api + '/api/getUserInfo',
  changeUserInfo: api + '/api/changeUserInfo',
  changePassword: api + '/api/changePassword',
  deleteUserAccount: api + '/api/deleteUserAccount',
  getMoreProducts: api + '/api/getMoreProducts',
}
export default variable;

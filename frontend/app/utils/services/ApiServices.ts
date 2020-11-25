import http from "./HttpService";
import config from "./config";
import auth from "./AuthService";
import Constants from "expo-constants";
const { manifest } = Constants;

class ApiServices {
    // withCache(apiFunction, key, expireDateOrExpireAfterInMinutes = null) {
    //     return async (...args) => {
    //         let data = lsu.lsGet(key);
    //         if (data) {
    //             return data;
    //         }
    //         data = await apiFunction(...args);
    //         lsu.lsSet(key, data, expireDateOrExpireAfterInMinutes);
    //         window[key] = data;
    //         return data;
    //     }
    // }

    // apiCacheKey = {
    //     HapCustomFilterViewList: "HapCustomFilterViewList",
    //     CustomFieldList: "CustomFieldList",
    //     GroupTypeCache: 'GroupTypeCache',
    //     GameCategoryCache: 'GameCategoryCache'
    // }

    // clearCache(key) {
    //     lsu.lsSet(key, null)
    // }

    // getCustomFieldList_WithCache = this.withCache(this.getCustomFieldList, this.apiCacheKey.CustomFieldList, 1440); // 1440 = 24 Hours

    // getCustomFieldList() {
    //     return http.get(config.BACKEND_URL + "/api/group/type/customfield", {
    //         Authorization: auth.getToken()
    //     });
    // }

    uri = `http://${manifest.debuggerHost.split(':').shift()}:${config.BACKEND_PORT}`;
    login(username, password) {
        return http.post(this.uri + "/api/public/login", { username, password });
    }

    register(param) {
        return http.post(this.uri + "/api/public/register", param);
    }

    isUserNameExist(username) {
        return http.post(this.uri + "/api/public/isUsernameExist", { username });
    }

    async savePassword(password) {
        return http.post(this.uri + "/api/user/savePassword", { password }, { 'Authorization': (global as any).token || await auth.getToken() });
    }

    async saveNameAndImage(objRequest) {

        return http.post(this.uri + "/api/user/saveNameAndImage", objRequest, { 'Authorization': (global as any).token || await auth.getToken() });
    }

    async getUserInfo() {
        return http.post(this.uri + "/api/user/getUserInfo", {}, { 'Authorization': (global as any).token || await auth.getToken() });
    }

}

const api = new ApiServices();
export default api;
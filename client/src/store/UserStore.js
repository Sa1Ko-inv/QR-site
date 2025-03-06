//Файл для хранения данных о пользователе
import { makeAutoObservable } from "mobx";

class UserStore {
    _isAuth = false;
    _user = {};
    _role = null;

    constructor() {
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }

    setRole(role) {
        this._role = role;
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }

    get role() {
        return this._role;
    }

    isTeacher() {
        return this._role === "TEACHER";
    }

    isStudent() {
        return this._role === "STUDENT";
    }

    logout() {
        this._isAuth = false;
        this._user = null;
        this._role = null;
    }
}

export default UserStore;

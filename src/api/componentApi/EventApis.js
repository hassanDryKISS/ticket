import { logout } from '../../utilities/Functions/SetupFunctions'
import BaseDomainService from '../baseApi/BaseDomainService';
import notif from '../../utilities/Functions/Notification'
import * as  Param from '../../redux/Param'
import { setParam } from '../../redux/actions';
import store from "../../redux/store";
import axios from 'axios'
import setCookie from 'set-cookie-parser';

const REACT_APP_BACKEND_ADDR_APIS='https://vision-idea.com';  


export default class EventApis {
    constructor() {
        this.services = new BaseDomainService()
    }

    handleError(ex) {
        try {
            notif('error'
                , 'Error',
                ex.data.message)
            if (ex.status === 401) {
                logout()
            }
        }
        catch (error) {
            notif('error'
                , 'Error',
                'Server Error')
        }
    }

    get(url, params, callback, noLoader = false) {
        this.services.get_param(`${Param.SERVER_URL.EVENT.BASE}/${url}`, params, (response) => {
            if (response.status === 200) {
                callback(response)
            }
            else {
                this.handleError(response)
            }
        }, noLoader)
    }

    getById(id, callback) {
        this.services.get_auth(Param.SERVER_URL.EVENT.BASE + `/${id}`, (response) => {
            if (response.status === 200) {
                callback(response)
            }
            else {
                this.handleError(response)
            }
        })
    }

    create(url, data, callback, errorCallback = false, noLoader = false) {
        if (!noLoader) {
            store.dispatch(setParam(Param.LOADING_API, true))
        }
        axios(`${REACT_APP_BACKEND_ADDR_APIS}/${Param.SERVER_URL.EVENT.BASE}/${url}`, {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // 'Content-Disposition': 'form-data'
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
            data: data,
        })
            .then((response) => {
                if (response.status === 200) {
                    callback(response)
                    store.dispatch(setParam(Param.LOADING_API, false))
                }
                else {
                    store.dispatch(setParam(Param.LOADING_API, false))
                    this.handleError(response)
                }
            })
            .catch(ex => {
                store.dispatch(setParam(Param.LOADING_API, false))
                this.handleError(ex);
                if (errorCallback) {
                    errorCallback(ex)
                }
            })
    }

    post(url, data, callback) {
        this.services.post_data(`${Param.SERVER_URL.EVENT.BASE}/${url}`, data, (response) => {
            if (response.status === 201) {
                callback(response)
            }
            else {
                this.handleError(response)
            }
        })
    }

    edit(id, data, callback) {
        this.services.put_auth(Param.SERVER_URL.EVENT.BASE + `/${id}`, data, (response) => {
            if (response.status === 200) {
                callback(response)
            }
            else {
                this.handleError(response)
            }
        })
    }

    delete(id, callback) {
        this.services.delete_auth(Param.SERVER_URL.EVENT.BASE + `/${id}`, (response) => {
            if (response.status === 200) {
                callback(response)
            }
            else {
                this.handleError(response)
            }
        })
    }

}
import { Component } from 'react';
import { API } from "./BaseService";
import * as Param from '../../redux/Param'
import { setParam } from '../../redux/actions';
import store from "../../redux/store";
import notif from '../../utilities/Functions/Notification'
import { logout } from '../../utilities/Functions/SetupFunctions'
// import { clean } from '../../redux/localStorage'
import history from '../../redux/history'


export default class BaseDomainService extends Component {


    constructor(props) {
        super(props);
        this.api = new API();
    }

    get_auth(url, callback) {
        store.dispatch(setParam(Param.LOADING_API, true))
        this.api.GET_AUTH(url)
            .then((response) => {
                callback(response)
                store.dispatch(setParam(Param.LOADING_API, false))
            })
            .catch(ex => {
                this.handleErrorAuth(ex);
            })
    }

    get_param_auth(url, params, callback, noLoader = false) {
        if(!noLoader){
            store.dispatch(setParam(Param.LOADING_API, true))
        }
        this.api.GET_PARAM_AUTH(url, params)
            .then((response) => {
                callback(response)
                store.dispatch(setParam(Param.LOADING_API, false))
            })
            .catch(ex => {
                this.handleErrorAuth(ex);
            })
    }

    post_data(url, data, callback) {
        store.dispatch(setParam(Param.LOADING_API, true))
        this.api.POST(url, data)
            .then((response) => {
                callback(response)
                store.dispatch(setParam(Param.LOADING_API, false))
            })
            .catch(ex => {
                this.handleErrorAuth(ex);
            })
    }

    put_auth(url, data, callback) {
        store.dispatch(setParam(Param.LOADING_API, true))
        this.api.EDIT_AUTH(url, data)
            .then((response) => {
                callback(response)
                store.dispatch(setParam(Param.LOADING_API, false))
            })
            .catch(ex => {
                this.handleErrorAuth(ex);
            })
    }

    post_data_auth(url, data, callback) {
        store.dispatch(setParam(Param.LOADING_API, true))
        this.api.POST_AUTH(url, data)
            .then((response) => {
                callback(response)
                store.dispatch(setParam(Param.LOADING_API, false))
            })
            .catch(ex => {
                this.handleErrorAuth(ex);
            })
    }

    // post_formdata_auth(url, data, callback) {
    //     store.dispatch(setParam(Param.LOADING_API, true))
    //     this.api.POST_FORMDATA_AUTH(url, data)
    //         .then((response) => {
    //             callback(response)
    //             store.dispatch(setParam(Param.LOADING_API, false))
    //         })
    //         .catch(ex => {
    //             this.handleErrorAuth(ex);
    //         })
    // }

    delete_auth(url, callback) {
        store.dispatch(setParam(Param.LOADING_API, true))
        this.api.DELETE_AUTH(url)
            .then((response) => {
                callback(response)
                store.dispatch(setParam(Param.LOADING_API, false))
            })
            .catch(ex => {
                this.handleErrorAuth(ex);
            })
    }

    handleErrorAuth(ex) {
        try {
            notif('error'
                , 'Error',
                ex.response.data.message)
            store.dispatch(setParam(Param.LOADING_API, false))
            if (ex.response.status === 401) {
                logout()
            }
            if (ex.response.status === 403) {
                history.push('/home')
            }
        }
        catch (error) {
            store.dispatch(setParam(Param.LOADING_API, false))
            notif('error'
                , 'Error',
                'Server Error')
        }

    }
}

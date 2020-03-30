import { logout } from '../../utilities/Functions/SetupFunctions'
import BaseDomainService from '../baseApi/BaseDomainService';
import notif from '../../utilities/Functions/Notification'
import * as  Param from '../../redux/Param'

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

    get(url, params, callback, noLoader =false) {
        this.services.get_param(`${Param.SERVER_URL.EVENT.BASE}/${url}`, params, (response) => {
            if (response.status === 200) {
                callback(response)
            }
            else {
                this.handleError(response)
            }
        },noLoader)
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

    create(data, callback) {
        this.services.post_data_auth(Param.SERVER_URL.EVENT.BASE, data, (response) => {
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
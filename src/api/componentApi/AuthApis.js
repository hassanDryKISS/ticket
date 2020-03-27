import { logout } from '../../utilities/Functions/SetupFunctions'
import BaseDomainService from '../baseApi/BaseDomainService';
import notif from '../../utilities/Functions/Notification'
import * as  Param from '../../redux/Param'

export default class AuthApis {
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

    login(data, callback) {
        this.services.post_data(Param.SERVER_URL.AUTH.LOGIN, data, (response) => {
            if (response.status === 201) {
                callback(response)
            }
            else {
                this.handleError(response)
            }
        })
    }

    register(data, callback) {
        this.services.post_data(Param.SERVER_URL.AUTH.REGISTER, data, (response) => {
            if (response.status === 201) {
                callback(response)
            }
            else {
                this.handleError(response)
            }
        })
    }

}
import { logout } from '../../utilities/Functions/SetupFunctions'
import BaseDomainService from '../baseApi/BaseDomainService';
import notif from '../../utilities/Functions/Notification'
import * as  Param from '../../redux/Param'
// import { setParam } from '../../redux/actions';
// import store from "../../redux/store";
// import axios from 'axios'
// import setCookie from 'set-cookie-parser';

// const REACT_APP_BACKEND_ADDR_APIS='https://vision-idea.com';  
const REACT_APP_BACKEND_ADDR_APIS='https://core.vision-idea.com';  



export default class SearchesApis {
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
        this.services.get_param(`${REACT_APP_BACKEND_ADDR_APIS}/${Param.SERVER_URL.EVENT.BASE}/${url}`, params, (response) => {
            if (response.status === 200) {
                callback(response)
            }
            else {
                this.handleError(response)
            }
        }, noLoader)
    }

}
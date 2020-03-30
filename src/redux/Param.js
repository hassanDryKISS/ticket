const PARAM = 'PARAM_'
const PAGE = 'PAGE_'
const SERVER = ''

module.exports = {
    PARAM: PARAM,
    PAGE: PAGE,
    SERVER: SERVER,

    //DYNAMIC VARIEABLES
    ///////////////////////////////////////////////////////////PAGES 
    PAGE_ONE: PAGE + 'PAGE_ONE',

 


    ///////////////////////////////////////////////////////////PARAMETRS
    TOKEN: PARAM + 'TOKEN',
    LOADING_PAGE: PARAM + 'LOADING_PAGE',
    LOADING_API: PARAM + 'LOADING_API',
    EVENTS: PARAM + 'EVENTS',


    SERVER_URL: {
        AUTH:{
            LOGIN : 'auth/login',
        },
        EVENT:{
            BASE : 'backend/events',
            PERFORMANCE : 'backend/events/performance',
        },
        HOME:{
            BASE : 'backend/events/list',
        },
    
    }
}
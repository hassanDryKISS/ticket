export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        // const serializedState = cookie.load('state')
        if (serializedState === null) {
            return undefined;
        }
        return (JSON.parse(serializedState));
    } catch (err) {
        return undefined;
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state)
        // cookie.save('state', serializedState)
        localStorage.setItem('state', serializedState);
    } catch (err) {
        //Ignore write errors
    }
}

export const save = (key, state, callback) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem(key, serializedState);
        callback()
    } catch (err) {
    }
}



export const load = (key, callback) => {
    try {
        const cashedHits = localStorage.getItem(key)
        if (cashedHits) {
            callback(JSON.parse(cashedHits))
        }
        else {
            callback(null)
        }
    } catch (err) {
    }
}



export const clean = (key) => {
    try {
        const serializedState = JSON.stringify(null);
        localStorage.setItem(key, serializedState);
    } catch (err) {
    }
}


export const saveAuth = (state, callback) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('auth', serializedState);
        callback()
    } catch (err) {
    }
}

export const loadAuth = () => {
    try {
        const cashedHits = localStorage.getItem('auth')
        if (cashedHits) {
            return (JSON.parse(cashedHits))
        }
        else {
            return ({ token: '', auth: false })
        }
    } catch (err) {
    }
}


export const cleanAuth = () => {
    try {
        const serializedState = JSON.stringify({ token: '', auth: false });
        localStorage.setItem('auth', serializedState);
    } catch (err) {
    }
}
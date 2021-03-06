import 'swiper/css/swiper.css'
import * as React from 'react';
import {
    Router,
    Route,
    Switch
} from 'react-router-dom'

import { connect } from 'react-redux'
import * as Param from './redux/Param'
import history from './redux/history'



//Company admin pages
import HomePage from './pages/PanelPages/Home'
import EventPage from './pages/PanelPages/EventPage'
import EventDetail from './pages/PanelPages/EventDetail'
import SearchPage from './pages/PanelPages/SearchPage'
import SuccessPage from './pages/PanelPages/Success'
import ErrorPage from './pages/PanelPages/Fail'

//Main Container
import MainContainer from './pages/PanelPages/Main/MainContainer'


//Front Pages
import Login from './pages/FrontPages/Login'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: '/',
            subPage: '/'
        };
    }

    onRouteChanged(page, subPage) {
    
        if (this.state.page !== page) {
            this.setState({ page })
        }
        if (this.state.subPage !== subPage) {
            this.setState({ subPage })
        }
    }


    render() {
        return (
            <Router history={history} >
                <Switch>
                    {/* <Route exact={true} path="/"
                        render={(props) => {
                            return<Login {...props} />;
                        }} /> */}
                          <Route exact={true} path="/event-detail/:hallId/:id"
                        render={(props) => {
                            return<EventDetail {...props} />;
                        }} />

                    <Route>
                        <Switch>
                            <MainContainer
                                page={this.state.page}
                                subPage={this.state.subPage}
                                history={history}
                            >
                                <Route exact={true} path="/login"
                                    render={(props) => {
                                        return <Login {...props} />;
                                    }} />
                                <Route exact={true} path="/home"
                                    render={(props) => {
                                        this.onRouteChanged('Home', '/');
                                        return <HomePage {...props} />;
                                    }} />
                                <Route exact={true} path="/"
                                    render={(props) => {
                                        this.onRouteChanged('Home', '/');
                                        return <HomePage {...props} />;
                                    }} />
                                <Route exact={true} path="/event/:hallId/:id"
                                    render={(props) => {
                                        this.onRouteChanged('Event', '/');
                                        return <EventPage {...props} />;
                                    }} />  
                                    <Route exact={true} path="/search"
                                    render={(props) => {
                                        this.onRouteChanged('Search', '/');
                                        return <SearchPage {...props} />;
                                    }} />
                                    <Route exact={true} path="/success/:fullname/:email/:orderId"
                                    render={(props) => {
                                        this.onRouteChanged('Success', '/');
                                        return <SuccessPage {...props} />;
                                    }} />
                                     <Route exact={true} path="/error/:fullname/:email/:orderId"
                                    render={(props) => {
                                        this.onRouteChanged('Error', '/');
                                        return <ErrorPage {...props} />;
                                    }} />
                            </MainContainer>
                        </Switch>
                    </Route>
                </Switch>
            </Router>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch
    }
}
const mapStateToProps = (state) => ({
    loading_page: state.param[Param.LOADING_PAGE]
});

export default connect(mapStateToProps, mapDispatchToProps)(App)

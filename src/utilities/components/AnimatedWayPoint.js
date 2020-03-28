import * as React from 'react';
import { Waypoint } from 'react-waypoint';
export class AnimatedWayPointDiv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visited: false
        };
    }

    render() {
        const { className, style} = this.props
        return (
            <div className={className + `${this.state.visited ? ' fadeInUp' : ' ftco-animate'}`} style={style}>
                <Waypoint
                    onEnter={() => this.setState({ visited: true })}
                />
                {this.state.visited ? this.props.children : ''}
            </div>
        )
    }
}

AnimatedWayPointDiv.defaultProps = {
    className: '',
    style: {}
}

export class AnimatedWayPointLi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visited: false
        };
    }

    render() {
        const { className } = this.props
        return (
            <li className={className + `${this.state.visited ? ' fadeInUp' : ' ftco-animate'}`}>
                <Waypoint
                    onEnter={() => this.setState({ visited: true })}
                />
                {this.props.children}
            </li>
        )
    }
}

AnimatedWayPointLi.defaultProps = {
    className: ''
}
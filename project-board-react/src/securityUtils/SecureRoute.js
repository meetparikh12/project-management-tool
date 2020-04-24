import React from 'react'
import { Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SecureRoute = ({ component:Component, loggedinUser, ...otherProps }) => {
  return (<Route 
    {...otherProps} 
    render = { props => 
        loggedinUser.validToken === true ? (
            <Component {...props}/>
        ) : ( 
            <Redirect to="login" /> 
        )
    }
    />)
};

SecureRoute.propTypes = {
    loggedinUser: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    loggedinUser: state.user
});

export default connect(mapStateToProps,null)(SecureRoute);

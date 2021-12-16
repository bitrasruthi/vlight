import React from "react";
import auth from "../../services/authService";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const jwt = auth.getCurrentUser()

        if (auth.getCurrentUser() && jwt.isAdmin )
          return (
            Component ? <Component {...props} /> : render(props)

          );
        return (<Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />)
      }}
    />
  );
};

export default ProtectedRoute;

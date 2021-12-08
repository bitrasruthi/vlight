import React from "react";
import auth from "../../services/authService";
import { Route, Redirect } from "react-router-dom";

const EmpProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const jwt = auth.getCurrentUser()

        if (auth.getCurrentUser() && jwt.EmployeeId)
          return (
            Component ? <Component {...props} /> : render(props)

          );
        return (<Redirect
          to={{
            pathname: "/elogin",
            state: { from: props.location },
          }}
        />)
      }}
    />
  );
};

export default EmpProtectedRoute;

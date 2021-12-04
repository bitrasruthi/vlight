import React from "react";
import auth from "../../services/authService";
import { Route, Redirect } from "react-router-dom";

const EmpProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.getCurrentUser().AdminId)
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default EmpProtectedRoute;

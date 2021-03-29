import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { YesList } from "./YesList";
import { CreateYes } from "./CreateYes";
import { Yes } from "./Yes";

export const YesIndex = (): React.ReactElement => {
  useBreadcrumbs("/yeses/", "yeses");

  return (
    <Switch>
      <PrivateRoute exact path={"/yeses/"} component={YesList} />
      <PrivateRoute path={"/yeses/new"} component={CreateYes} />
      <PrivateRoute path={"/yeses/:id"} component={Yes} />
    </Switch>
  );
};

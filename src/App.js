import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Authors from "./pages/Authors";
import Books from "./pages/Books";
import { ROOT, AUTHORS, BOOKS } from "./routesMap";
import { Suspense } from "react";
import AppBase from "./modules/appbase/components/AppBase";

function App() {
    const RedirectToRoot = () => <Redirect to={ROOT} />;
    return (
        <AppBase>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path={ROOT} component={Home} />
                    <Route path={AUTHORS} component={Authors} />
                    <Route path={BOOKS} component={Books} />
                    <Route component={RedirectToRoot} />
                </Switch>
            </Suspense>
        </AppBase>
    );
}

export default App;

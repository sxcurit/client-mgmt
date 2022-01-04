import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps, Link, Router } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/customer/Create';
import EditCustomer from './components/customer/Edit';
import Footer from './components/Footer';

class App extends React.Component<RouteComponentProps<any>> {
  public render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to={'/'}> Home </Link>
            </li>

            <li>
              <Link to={'/clients'}> Add Clients </Link>
            </li>

            <li>
              <Link to={'/about'}> About </Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/clients'} exact component={Create} />
          <Route path={'/edit/:id'} exact component={EditCustomer} />
        </Switch>

        <Switch>
        <Route path={'/'} exact component={Footer} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
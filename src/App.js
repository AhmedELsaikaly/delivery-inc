import { Suspense, lazy } from 'react';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import DataProvider from './contexts/data';
import { useDocTitle } from './hooks';
import { ROUTES } from './constants';
import Layout from './components/layout';
import Loader from './components/common/Loader';

import './App.css';

const Packages = lazy(() => import('./pages/Packages'));
const Customers = lazy(() => import('./pages/Customers'));
const Invoice = lazy(() => import('./pages/Invoice'));
const Invoices = lazy(() => import('./pages/Invoices'));
const NotFound = lazy(() => import('./pages/404'));

function App() {
  useDocTitle('React Delivery Inc');

  return (
    <DataProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Suspense fallback={<Loader />}>
              <Switch>
                <Redirect exact from='/' to={ROUTES.PACKAGES} />
                <Route exact path={ROUTES.PACKAGES} component={Packages} />
                <Route exact path={ROUTES.CUSTOMER} component={Customers} />
                <Route exact path={`${ROUTES.INVOICES}`} component={Invoices} />
                <Route
                  exact
                  path={`${ROUTES.INVOICES}/:customerId`}
                  component={Invoice}
                />
                <Route component={NotFound}></Route>
              </Switch>
            </Suspense>
          </Layout>
        </Router>
      </ThemeProvider>
    </DataProvider>
  );
}

export default App;

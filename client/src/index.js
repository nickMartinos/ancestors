import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './config.js';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Tree from './components/Tree';
import Admin from './components/Admin';

const IndexPage = () => (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/tree" component={Tree} />
      <Route path="/admin" component={Admin} />
      <Route render={() => <Redirect to={{pathname: "/"}} />} />
    </Switch>
);

const Navbar = () => (
    <div className="bg-gray-400 pt-1 pb-1">
        <ul className="mt-2 flex">
            <li className="mr-3 ml-3">
                
                <a 
                    className={window.location.pathname === '/' ? 
                        (global.config.activeLinkButton) : 
                        (global.config.inactiveLinkButton)
                    } 
                    href="/">Tree Browsing</a>
            </li>
            <li className="mr-3">
                <a className={window.location.pathname === '/admin' ? 
                        (global.config.activeLinkButton) : 
                        (global.config.inactiveLinkButton)
                    } 
                    href="admin">Admin</a>
            </li>
        </ul>
    </div>
);

const Footer = () => (
    <></>
);

ReactDOM.render(
    [<Navbar/>,
    <BrowserRouter path="/">
        <IndexPage/>
    </BrowserRouter>,
    <Footer/>], document.getElementById('root')
);
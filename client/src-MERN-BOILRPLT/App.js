import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import GlobalProvider from './utils/GlobalContext';
import Homepage from './pages/Homepage';
import AddTodo from './pages/AddTodo';
import ViewTodos from './pages/ViewTodos';
import Navbar from './components/Navbar';
import Index from './index'
import Meeting from './meeting'

function App() {
  return (
    <Router>
      <GlobalProvider>
        <Navbar />

        <div className="App">
          <Switch>
            {/* <Route exact path='/' component={Homepage} /> */}
            <Route exact path='/todos' component={ViewTodos} />
            <Route exact path='/todos/new' component={AddTodo} />
            <Route exact path="/" component={Index} />
            <Route exact path="/meeting" component={Meeting} />
          </Switch>
        </div>
      </GlobalProvider>
    </Router>
  );
}


export default App;

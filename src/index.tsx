import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/home.tsx'
import SignUp from './pages/signup.tsx'
import LogIn from './pages/login.tsx'
import UserDashboard from './pages/user/dashboard.tsx'

class App extends React.Component {
  render () {
    return (
      <Router>
        <Route key='home' path='/' exact component={Home} />
        <Route key='documentation' path='/documentation' component={null} />
        <Route key='signup' path='/signup' component={SignUp} />
        <Route key='login' path='/login' component={LogIn} />
        <Route key='user-dashboard' path='/dashboard' component={UserDashboard} />
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

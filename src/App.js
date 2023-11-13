import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import NotFound from './components/NotFound'

import './App.css'
import CourseItemDetails from './components/CourseItemDetails'
import CourseShow from './components/CourseShow'

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/course/:id" component={CourseItemDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)

export default App

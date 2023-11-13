import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import CourseList from '../CourseList'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    primeDeals: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPrimeDeals()
  }

  getPrimeDeals = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.courses.map(item => ({
        id: item.id,
        logoUrl: item.logo_url,
        name: item.name,
      }))
      console.log(updatedData)
      this.setState({
        primeDeals: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessList = () => {
    const {primeDeals} = this.state
    return (
      <div>
        <h1>Courses</h1>
        <ul className="container">
          {primeDeals.map(item => (
            <li className="container">
              <Link to={`/course/${item.id}`}>
                <img src={item.logoUrl} alt={item.name} />
              </Link>
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="register-prime-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button">Retry</button>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default Home

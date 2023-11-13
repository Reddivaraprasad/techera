import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {
    detailedView: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.course_details
      const newData = {
        id: updatedData.id,
        description: updatedData.description,
        imageUrl: updatedData.image_url,
        name: updatedData.name,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        detailedView: newData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessList = () => {
    const {detailedView} = this.state
    const {name, imageUrl, description} = detailedView
    return (
      <div>
        <div className="detailView">
          <img className="CourseImage" src={imageUrl} alt={name} />
          <div>
            <h1>{name}</h1>
            <p>{description}</p>
          </div>
        </div>
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

export default CourseItemDetails

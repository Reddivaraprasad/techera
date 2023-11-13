import {withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const websiteLogo = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="websiteLogo">
      <img
        className="image"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        onClick={websiteLogo}
      />
    </div>
  )
}

export default withRouter(Header)

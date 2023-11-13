import {withRouter, Link} from 'react-router-dom'
import './index.css'

const CourseList = props => {
  const {courseDetails} = props
  const {id, logoUrl, name} = courseDetails

  return (
    <li className="container">
      <Link to={`/course/${id}`}>
        <img src={logoUrl} alt={name} />
      </Link>
      <h1>{name}</h1>
    </li>
  )
}

export default withRouter(CourseList)

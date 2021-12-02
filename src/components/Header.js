import PropTypes from 'prop-types'
import Button from './Button' // Tells JS to import values that we'll need to use later. Without this values/variables will not be understood
import { useLocation } from 'react-router-dom'

const Header = ({ title, onAdd, showAdd }) => { // Creating the page header
    const location = useLocation()
    
    return ( 
        <header className='header'> 
            <h1>{title}</h1>
            {location.pathname === '/' && <Button 
                color={showAdd ? 'red' : 'green'}
                text={showAdd ? 'Close' : 'Add'}
                onClick={onAdd}
            />} 
        </header>
    ) // Returns a single element with child elements
}

Header.defaultProps = { // Default title is set to 'Task Tracker' if no other value is set
    title: 'Task Tracker'
}

Header.propTypes = { // Only valid input for text is string, if anything other than a string passed, console throws an error
    text: PropTypes.string
}

export default Header // Exports Header.js so it can be imported in other components

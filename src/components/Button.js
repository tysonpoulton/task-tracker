import PropTypes from 'prop-types' // Telling JS to import PropTypes to use later

const Button = ({ color, text, onClick }) => { // Creates a button each time this function is called
    return (
        <button 
        onClick={onClick} // When clicked, calls the onClick function in Header.js
        style={{backgroundColor: color}} // Sets the background color of the button to whatever color is passed into Button(color)
        className='btn'
        >{text}</button> //Text is set in Header.js
    )
}

Button.defaultProps = { // Default value
    color: 'steelblue', // If no color is passed into the button, default value of 'steel blue' is used
}

Button.propTypes = { // Ensures that the data passed into Button(text, color, onClick) are valid
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default Button // Exports button so Header.js, etc. can use it


import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggable = forwardRef((props, refs) => {
  const [visible, setVisble] = useState(false)

  const hideWhenVisble = { display: visible ? 'none' : '' }
  const showWhenVisble = { display: visible ? '' : 'none' }

  const toggleVisibilty = () => {
    setVisble(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibilty
    }
  })

  return(
    <>
      <div style={hideWhenVisble}>
        <button onClick={toggleVisibilty}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisble}>
        {props.children}
        <button onClick={toggleVisibilty}>cancel</button>
      </div>
    </>
  )
})

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Toggable.displayName = 'Togglable'

export default Toggable
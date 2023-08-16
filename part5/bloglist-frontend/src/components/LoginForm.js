import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handelPasswordChange
}) => {

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>username:
          <input
            value={username}
            name='username'
            onChange={handleUsernameChange}
            type='text'
          />
        </div>
        <div>password:
          <input
            value={password}
            name='password'
            onChange={handelPasswordChange}
            type='password'
          />
        </div>
        <button>login</button>
      </form>
    </div>
  )
}

LoginForm.prototype = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handelPasswordChange: PropTypes.func.isRequired
}

export default LoginForm
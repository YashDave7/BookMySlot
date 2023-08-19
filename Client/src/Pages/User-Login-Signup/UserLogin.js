import React from 'react'

const UserLogin = () => {
    return (
        <>
            <div className="login">
                <div className="auth-form-container">
                    <h2>Login</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label htmlFor="email">username</label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="john"
                            id="email"
                            name="email"
                        />
                        <label htmlFor="password">password</label>
                        <input
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            type="password"
                            placeholder="********"
                            id="password"
                            name="password"
                        />
                        <button type="submit">Log In</button>
                    </form>
                    {/* <Link to="/register" className="link-btn">
            Don't have an account? Register here.
          </Link> */}
                </div>
            </div>
        </>
    )
}

export default UserLogin
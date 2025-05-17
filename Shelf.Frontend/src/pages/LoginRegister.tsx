import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRegister = ({setAuth}: {setAuth: Function}) => { 
    const navigate = useNavigate();
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [registerMessage, setRegisterMessage] = useState('');
    const [loginMessage, setLoginMessage] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setRegisterMessage('');
        const response = await fetch('/api/account/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: registerUsername, password: registerPassword }),
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            setRegisterMessage('Registration successful');
            setAuth(true);
            navigate('/'); // Redirect to home page
        } else {
            // Do not keep this, this is just for testing
            setRegisterMessage(await response.text());
        }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginMessage('');
        const response = await fetch('/api/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: loginUsername, password: loginPassword }),
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            setLoginMessage('Login successful');
            setAuth(true);
            navigate('/'); // Redirect to home page
        } else {
            // Do not keep this, this is just for testing
            setLoginMessage(await response.text());
        }
    }

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center w-100">
                <div className="col-10 col-md-6  col-lg-4 mb-4">
                    <h2>Register</h2>
                    {registerMessage && <div className="alert alert-info mt-3">{registerMessage}</div>}
                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label htmlFor="register-username" className="form-label">Username</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="register-username" 
                            value={registerUsername} 
                            onChange={e=> setRegisterUsername(e.target.value)}
                        />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="register-password" 
                                value={registerPassword}
                                onChange={e => setRegisterPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
                <div className="col-10 col-md-6 col-lg-4">
                    <h2>Login</h2>
                    {loginMessage && <div className="alert alert-info mt-3">{loginMessage}</div>}
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="username" 
                                value={loginUsername}
                                onChange={e => setLoginUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                value={loginPassword}
                                onChange={e => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginRegister;
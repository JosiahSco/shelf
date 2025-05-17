import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated }: {isAuthenticated: boolean}) => (
    <nav id="navbar-example2" className="navbar bg-body-tertiary px-3">
        <Link to="/" className="nav-link"><h1 className='h3'>Shelf</h1></Link>
        <ul className="nav nav-pills d-flex flex-row align-items-center">
            <li className="nav-item me-4">
                <Link to="/" className="btn btn-primary">Add to Shelf</Link>
            </li>
            <li className="nav-item">
                {isAuthenticated ? (
                    <Link to='/profile' className="nav-link p-0"><i className="bi bi-person-circle" style={{ fontSize: '2rem' }}></i></Link>
                ) : (
                    <Link to='/login-register' className="nav-link p-0">Login/Register</Link>
                )}
            </li>
        </ul>
</nav>
);

export default Navbar;
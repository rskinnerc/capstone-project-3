import { Link, useMatch } from 'react-router-dom';

const Navbar = () => {
  const isHome = useMatch('/');

  return (
    <nav className="flex flex-row justify-items-center bg-marino-600 text-white py-2 sm:w-96 mx-auto">
      <h1 className="basis-10/12 pl-3 font-semibold font-gill">
        {!isHome && <Link to="/"><i data-testid="backButton" className="bi bi-caret-left-fill" /></Link>}
        {' '}
        The Games Database
      </h1>
      <i className="bi bi-mic-fill justify-self-end basis-1/12" />
      <i className="bi bi-gear-fill justify-self-end basis-1/12" />
    </nav>
  );
};

export default Navbar;

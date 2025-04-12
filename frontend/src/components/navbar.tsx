import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="bg-gray-800 ">
      <nav className="container mx-auto text-white p-1 flex items-center justify-between gap-6">
        <Link to={"/"} className="font-bold text-xl w-36">
          <img src="/logot.png" className="w-full h-full" alt="scravix logo" />
        </Link>
        <div className="flex gap-6">
          <Link to="/scraping" className="hover:underline">
            Scraping
          </Link>
          <Link to="/search" className="hover:underline">
            Data Search
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

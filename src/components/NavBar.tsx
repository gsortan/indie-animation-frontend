import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <header className="flex items-center justify-center mt-auto bg-zinc-900  border-b border-slate-700 backdrop-blur-md shadow-2xl h-12">
        <nav>
            <ul className="flex text-blue-800  font-bold gap-3 text-lg">
          <li className=" hover:text-blue-900"><Link to="/" >Home</Link></li>
         <li className=" hover:text-blue-900"><Link to="/animations">Browse</Link> </li> 
          </ul>
        </nav>
      </header>
    </>
  );
}

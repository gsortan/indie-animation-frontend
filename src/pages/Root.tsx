import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function RootLayout()
{
    return (
    <div className="min-h-screen bg-slate-900">
    <NavBar/>
    <Outlet/>
    <Footer/>
</div>);
}
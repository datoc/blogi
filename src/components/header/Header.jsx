import { NavLink, Link } from "react-router-dom";
import scrollToTop from '../../functions/scrolToTop';
import { useWindowSize } from "@uidotdev/usehooks";
import { useState, useEffect } from "react";
import MobileMenu from "../mobileMenu/MobileMenu";
import Logo from '../../assets/images/header/star.png'


export const Header = ({isLoggedIn, setIsLoggedIn, isMainPage}) => { 
    const [isOpen, setIsOpen] = useState(false);
    let {width} = useWindowSize();

    useEffect(() => {
        width >= 768 && setIsOpen(false);
    }, [width])

    return(
        <div className={`${isMainPage ? 'bg-blue-100' : 'bg-white'} fixed left-0 right-0 top-0 z-10`}>
            <header className="lg:py-8 xl:py-9 py-[21px] container mx-auto flex justify-between items-center px-5">
                <Link 
                    onClick={scrollToTop} 
                    to={isLoggedIn ? '/' : '/login'} 
                    className="text-xl text-[#ecb313] gap-x-2 flex items-center font-bold font-roboto">
                        <img src={Logo} alt="" className="h-10 rotate-90" />
                        Reach Star
                </Link>
                <nav className="items-center hidden md:flex">
                    
                    {
                        isLoggedIn && (
                        <div className="font-opensans font-semibold text-base tracking-wide">
                            <NavLink 
                                className={({isActive}) => isActive ? 'text-red-500 mx-5' : 'text-blue-500 mx-5'} 
                                onClick={scrollToTop} to={'/'}>
                                    Home
                            </NavLink> 
                            <NavLink 
                                className={({isActive}) => isActive ? 'text-red-500 mx-5' : 'text-blue-500 mx-5'}   
                                onClick={scrollToTop} to={'/blog'}>
                                    Blog
                            </NavLink>
                            <NavLink 
                                className={({isActive}) => isActive ? 'text-red-500 mx-5' : 'text-blue-500 mx-5'}   
                                onClick={scrollToTop} to={'/dashboard'}>
                                    Dashboard
                            </NavLink>
                        </div>)
                    }
                    <Link 
                        onClick={() => {
                            setIsLoggedIn(false);
                        }}
                        className={`text-blue-500 font-opensans font-semibold text-base ms-5 me-2 border-2 py-2 px-4 rounded-full border-blue-500 tracking-wide`}  
                        to={`/login`}> 
                        {
                            isLoggedIn ? 'Log Out' : 'Log In' 
                        }
                    </Link>

                    {
                        isLoggedIn ? '' : (
                        <Link 
                            className={`text-blue-500 font-opensans font-semibold text-base ms-2 me-5 border-2 py-2 px-4 rounded-full border-blue-500 tracking-wide`}  
                            to={'/registration'}>
                                Register
                        </Link>)
                    }
                </nav>

                <div 
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden cursor-pointer">
                {
                    isOpen 
                    ? 
                    <ion-icon size='large' name="close-outline" style={{color: '#3A4C66'}}></ion-icon>
                    : 
                    <ion-icon size='large' name="menu-outline" style={{color: '#3A4C66'}}></ion-icon>
                }              
                <MobileMenu 
                    isOpen={isOpen} 
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn} 
                />    
                </div>
            </header>
        </div>
    )
}
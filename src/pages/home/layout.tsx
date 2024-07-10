import { Link, Outlet, useLocation } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import { useEffect, useState } from "react";

function NavLink({ to, children }: { to: string, children?: React.ReactNode }) {
    const { pathname } = useLocation();
    const [ mousePosition, setMousePosition ] = useState({ x: 0, y: 0 });

    return <li className="flex-1 flex">
        <Link
            onMouseMove={(e) => {
                const target = e.target as HTMLElement;
                setMousePosition({ x: e.clientX - target.offsetLeft, y: e.clientY - target.offsetTop });
            }}
            className={`flex-1 text-center block p-2 bg-clip-text text-transparent ${
                pathname === to ?
                    "from-yellow-500 to-yellow-800"
                    :
                    "from-stone-400 to-gray-500"
            }`}
            style={{
                "--mouse-x": `${mousePosition.x}px`,
                "--mouse-y": `${mousePosition.y}px`,
            } as React.CSSProperties}
            to={to}
        >
            {children}
        </Link>
    </li>;

}

export function Component() {
    const title = usePageTitle();
    const [deleting, setDeleting] = useState(false);
    const [displayedTitle, setDisplayedTitle] = useState("");

    function progressTitle() {
        if (deleting) {
            if (displayedTitle.length > 0) {
                setDisplayedTitle(displayedTitle.slice(0, -1));
            } else {
                setDeleting(false);
            }
        } else {
            if (displayedTitle !== title) {
                setDisplayedTitle(title.slice(0, displayedTitle.length + 1));
            } else {
                setDeleting(true);
            }
        }
    }
    
    useEffect(() => {
        setDeleting(true);
    }, [title]);

    useEffect(() => {
        if (title !== displayedTitle || deleting) {
            const interval = setTimeout(() => {
                progressTitle();
            }, 100);
            return () => clearInterval(interval);
        }
    }, [displayedTitle, deleting]);


    return <>
        <div className="bg-lime-600 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40 shadow-inner shadow-black pointer-events-none" />
            <div className="container m-auto flex align-middle min-h-12 p-2 md:min-h-24 md:p-4">
                <h1 className="text-3xl md:text-6xl">
                    {displayedTitle ?? <span>&nbsp;</span>}{"_"}
                </h1>
            </div>
        </div>
        <nav className="w-full">
            <ul className="container m-auto flex justify-evenly text-lg md:text-2xl">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/links">Links</NavLink>
            </ul>
        </nav>
        <main>
            <Outlet />
        </main>
    </>
}
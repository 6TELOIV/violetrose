import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function usePageTitle() {
    const { pathname } = useLocation();
    const [ title, setTitle ] = useState("Home");

    useEffect(() => {
        switch (pathname) {
            case "/":
                setTitle("Violet Rose");
                break;
            case "/about":
                setTitle("About Me");
                break;
            case "/links":
                setTitle("Links");
                break;
            default:
                setTitle("404");
                break;
        }
    }, [pathname])

    useEffect(() => {
        document.title = title;
    }, [title]);

    return title;
}
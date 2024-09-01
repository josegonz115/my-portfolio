import { useEffect } from "react";

const useBodyClass = (className: string) => {
    useEffect(() => {
        const previousClassName = document.body.className;
        document.body.className = className;

        return () => {
            document.body.className = previousClassName;
        };
    }, [className]);
};

export default useBodyClass;
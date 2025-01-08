import { useEffect } from "react";

type UseOnKeyDownOptions = {
    cmdKey?: boolean;
};

const useOnKeyDown = (
    key: string,
    callback: (e: KeyboardEvent) => void,
    options: UseOnKeyDownOptions = {
        cmdKey: false,
    }
) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const isCmdOrCtrlPressed = options.cmdKey ? (e.metaKey || e.ctrlKey) : true;
            if (e.key.toLowerCase() === key.toLowerCase() && isCmdOrCtrlPressed) {
                e.preventDefault()
                callback(e);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [key, callback, options]);
};

export default useOnKeyDown;

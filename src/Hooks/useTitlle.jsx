import { useEffect } from "react";


const useTitlle = title => {
    useEffect(() => {
        document.title = `${title} - World Talk`
    }, [title])
};

export default useTitlle;
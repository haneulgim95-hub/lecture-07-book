import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";

type BookItem = {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        description?: string;
        imageLinks?: {
            thumbnail?: string;
            small?: string;
        };
    };
};

function Search() {
    const [params, setParams] = useSearchParams();
    const q = params.get("keyword");

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=20&key=${API_KEY}`)
    }, []);

    return <></>
}

export default Search;
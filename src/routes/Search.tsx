import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import styles from "./Search.module.css";
export type BookItem = {
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

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function Search() {
    const [params] = useSearchParams();
    const q = params.get("keyword");

    const [list, setList] = useState<BookItem[]>([]);

    useEffect(() => {
        if (!q) return;
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=20&key=${API_KEY}`)
            .then(res => res.json())
            .then(json => {
                setList(json.items || []);
            })
            .catch(() => setList([]));
    }, [q]);

    return (
        <div className={styles.wrap}>
            <h3>검색 결과: {q}</h3>
            {list.map(b => (
                <Link key={b.id} to={`detail/${b.id}`} className={styles.wrap}>
                    <img src={b.volumeInfo.imageLinks?.thumbnail} alt={b.volumeInfo.title} className={styles.cover}/>
                    <div>
                        <div className={styles.title}>{b.volumeInfo.title}</div>
                        <div className={styles.authors}>{b.volumeInfo.authors?.join(", ")}</div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Search;

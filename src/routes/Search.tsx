import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import styles from "./Search.module.css";

type BookType = {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        description?: string;
        imageLinks?: {
            smallThumbnail?: string;
            thumbnail?: string;
        };
    };
};

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

type ApiResponseType = { items: BookType[] };

function Search() {
    const [list, setList] = useState<BookType[]>([]);
    const [searchParams] = useSearchParams();
    const k = searchParams.get("keyword");

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${k}&maxResults=20&key=${API_KEY}`)
            .then(res => res.json())
            .then((json: ApiResponseType) => setList(json.items))
            .catch(err => console.log(err));
    }, [k]);

    return (
        <div className={styles.container}>
            <h3>검색 결과: {k}</h3>
            <div className={styles.content}>
                {list.map(val => (
                    <Link key={val.id} to={`/detail/${val.id}`} className={styles.item}>
                        {val.volumeInfo.imageLinks?.thumbnail ? (
                            <img
                                src={val.volumeInfo.imageLinks.thumbnail}
                                className={styles.cover}
                                alt={val.volumeInfo.title}
                            />
                        ) : (
                            <div className={styles.noCover}>No cover</div>
                        )}

                        <div>
                            <h3 className={styles.bookTitle}>{val.volumeInfo.title}</h3>
                            <div className={styles.authors}>{val.volumeInfo.authors?.join(", ")}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Search;

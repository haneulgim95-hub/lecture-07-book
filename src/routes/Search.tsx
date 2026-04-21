import styles from "./Search.module.css";
import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
export type BookType = {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        description?: string;
        publishedDate: string;
        imageLinks?: {
            thumbnail?: string;
            small?: string;
        };
    };
};

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function Search() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const [list, setList] = useState<BookType[]>([]);

    useEffect(() => {
        if (!keyword) return;
        fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=20&key=${API_KEY}`,
        )
            .then(res => res.json())
            .then((json: { items: BookType[] }) => setList(json.items))
            .catch(err => console.log(err));
    }, [keyword]);

    return (
        <div className={styles.container}>
            <h2>검색 결과 : {keyword}</h2>
            <div className={styles.content}>
                {list.map(val => (
                    <Link key={val.id} to={`/detail/${val.id}`} className={styles.item}>
                        {val.volumeInfo.imageLinks?.thumbnail ? (
                            <img
                                className={styles.cover}
                                alt={val.volumeInfo.title}
                                src={val.volumeInfo.imageLinks.thumbnail}
                            />
                        ) : (
                            <div className={styles.noCover}>No cover</div>
                        )}
                        <div>
                            <h2 className={styles.bookTitle}>{val.volumeInfo.title}</h2>
                            <span className={styles.authors}>{val.volumeInfo.authors?.join(", ")}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Search;

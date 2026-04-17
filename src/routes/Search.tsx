import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./Search.module.css";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

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
    // query string으로 들어온 값을 꺼내오기 위해서는 useSearchParams를 사용

    // useParams를 사용할 떄는 const {id} = useParams();
    // useSearchParams는 useState와 사용법이 동일
    const [params, setParams] = useSearchParams(); // queryString 내용이 params에 담겨 나옴
    const k = params.get("keyword"); // "수학" 이라는게 있을 수도 있지만, 없을 수도 있음 (k : string | null) >> 쿼리스트링은 사용자가 지울수도 있다.

    // keyword 준비 됐으니, API를 통해 요청한 정보를 받아다가 화면에 출력만 해주면 됨
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState<BookItem[]>([]);

    useEffect(() => {
        if (!k) return;
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${k}&maxResults=20&key=${API_KEY}`)
            .then(res => res.json())
            .then(json => {
                setList(json.items);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className={styles.container}>
            <h3>검색 결과: {k}</h3>
            <div className={styles.content}>
                {list.map((value) => (
                    <Link key={value.id} to={`/detail/{value.id}`} className={styles.Link}>
                        <img className={styles.bookImage} src={value.volumeInfo.imageLinks?.thumbnail} alt={value.volumeInfo.title}/>
                        <div className={styles.info}>
                            <h3 className={styles.bookTitle}>{value.volumeInfo.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Search;

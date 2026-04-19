import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { BookItem } from "./Search.tsx";
import styles from "./Detail.module.css";


const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function Detail() {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<BookItem | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`)
            .then(res => res.json())
            .then((json: BookItem) => setBook(json))
            .catch(() => setBook(null));
    }, [id]);

    if (!book) return <div className={styles.wrap}>Loading...</div>;

    const info = book.volumeInfo;
    const cover = info.imageLinks?.thumbnail || "https://via.placeholder.com/200x300?text=No+Cover";

    return (
        <div className={styles.wrap}>
            <button
                className={styles.backButton}
                onClick={() => {
                    navigate(-1);
                }}>
                &larr; 뒤로 가기
            </button>

            <h2>{info.title}</h2>

            <img className={styles.cover} src={cover} alt={info.title}/>

            <p>{info.authors?.join(", ")}</p>
            <p dangerouslySetInnerHTML={{ __html: info.description || "설명 없음" }}></p>
        </div>
    );
}

export default Detail;

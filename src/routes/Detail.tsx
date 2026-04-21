import styles from "./Detail.module.css";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { BookType } from "./Search.tsx";
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function Detail() {
    const { id } = useParams();
    const [book, setBook] = useState<BookType | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`)
            .then(res => res.json())
            .then((json: BookType) => setBook(json))
            .catch(err => console.log(err));
    }, [id]);

    if (!book) return <div className={styles.wrap}>Loading...</div>;
    return (
        <div className={styles.wrap}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
                &larr; 뒤로 가기
            </button>
            {book.volumeInfo.imageLinks?.thumbnail ? (
                <img
                    className={styles.cover}
                    alt={book.volumeInfo.title}
                    src={book.volumeInfo.imageLinks.thumbnail}
                />
            ) : (
                <div className={styles.noCover}>No cover</div>
            )}
            <p>{book.volumeInfo.authors?.join(", ")}</p>
            <p dangerouslySetInnerHTML={{ __html: book.volumeInfo.description || "내용 없음"}}></p>
        </div>
    );
}

export default Detail;

import styles from "./Detail.module.css";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { BookItem } from "./Search.tsx";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function Detail() {
    // 들어온 주소값을 가지고, API 요청을 해서 받아온 데이터를 저장하고, 화면을 출력해준다.
    const { id } = useParams(); // string | undefined
    const [book, setBook] = useState<BookItem | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`)
            .then(res => res.json())
            .then((json: BookItem) => setBook(json))
            .catch(err => console.log(err));
    }, [id]);

    if (!book) return <div className={styles.loading}>Loading...</div>;

    return (
        <div className={styles.container}>
            <button
                className={styles.button}
                onClick={() => {
                    navigate(-1);
                }}>
                &larr; 뒤로 가기
            </button>

            <div className={styles.content}>
                {book.volumeInfo.imageLinks?.thumbnail ? (
                    <img
                        className={styles.cover}
                        src={book.volumeInfo.imageLinks?.thumbnail}
                        alt={book.volumeInfo.title}
                    />
                ) : (
                    <div>No cover</div>
                )}

                <div className={styles.info}>
                    <h3 className={styles.title}>{book.volumeInfo.title}</h3>
                    <span>{book.volumeInfo.authors?.join(", ")}</span>
                    <span>{book.volumeInfo.publishedDate}</span>
                </div>
            </div>
            <div
                className={styles.description}
                dangerouslySetInnerHTML={{
                    __html: book.volumeInfo.description || "설명 없음",
                }}
            />
        </div>
    );
}

export default Detail;

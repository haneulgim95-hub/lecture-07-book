import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { BookItem } from "./Search.tsx";
import styles from "./Detail.module.css";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState<BookItem | null>(null);

    useEffect(() => {
        if (!id) return;
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`)
            .then(res => res.json())
            .then((json: BookItem) => setBook(json))
            .catch(err => console.log(err));
    }, [id]);

    // Search 컴포넌트에서는 list가 초기값도 [], 값이 도착해도 [], 값이 도착하지 않아도 []라서
    // loading을 보여주기 위해서는 따로 loading을 관리했었어야 했는데
    // Detail 컴포넌트에서는 book이 초기값은 null이록, 값이 도착하면 BookType이되고, 값이 도착하지 않으면 null라서
    // book의 값이 있는지 없는지만 체크해줘도 loading 상태를 판별 할 수 있음.
    if (!book) return <div className={styles.wrap}>Loading...</div>;

    return (
        <div className={styles.wrap}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
                &larr; 뒤로가기
            </button>

            <h2>{book.volumeInfo.title}</h2>
            {book.volumeInfo.imageLinks?.thumbnail ? (
                <img className={styles.cover} src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title}/>
            ) : (
                <div>No Cover</div>
            )}
            <p>{book.volumeInfo.authors?.join(", ")}</p>
            {/*
                dangerouslySetInnerHTML 속성
                - 사용자가 입력한 내용을 그대로 렌더링할 때 사용
                - 사용할 때 주의가 필요함
                - 혹시라도, 해당 내용에 "악성코드"가 포함이 되어져 있다면
                - 그것조차 그대로 실행 됨.

                사용법 : dangerouslySetInnerHTML={{ __html: '내용' }}
            */}
            <p dangerouslySetInnerHTML={{ __html: book.volumeInfo.description || "설명 없음"}}></p>
        </div>
    );
}

export default Detail;

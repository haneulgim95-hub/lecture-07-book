import styles from "./SearchBar.module.css";
import { type ChangeEvent, type SubmitEvent, useState } from "react";
import { useNavigate } from "react-router";

function SearchBar() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!keyword.trim()) return;

        navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    };

    const onChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) =>
        setKeyword(e.target.value);

    return (
        <form className={styles.box} onSubmit={onSubmit}>
            <input className={styles.input} onChange={onChange}/>
            <button type={"submit"} className={styles.button}>검색</button>
        </form>
    );
}

export default SearchBar;

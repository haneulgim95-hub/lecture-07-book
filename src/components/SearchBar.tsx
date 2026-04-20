import { type ChangeEvent, type SubmitEvent, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./SearchBar.module.css";

function SearchBar() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const k = keyword.trim();
        if (!k) return;
        navigate(`/search?keyword=${encodeURIComponent(k)}`);
    };

    const onChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) =>
        setKeyword(e.target.value);

    return (
        <form
            onSubmit={onSubmit}
            className={styles.box}>
            <input onChange={onChange} className={styles.input}/>
            <button type={"submit"} className={styles.button}>검색</button>
        </form>
    );
}

export default SearchBar;

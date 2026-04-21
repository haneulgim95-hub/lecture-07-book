import styles from "./SearchBar.module.css";
import { type ChangeEvent, type SubmitEvent, useState } from "react";
import { useNavigate } from "react-router";

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
        <form className={styles.box} onSubmit={onSubmit}>
            <input className={styles.input} onChange={onChange}/>
            <button className={styles.button} type={"submit"}>검색</button>
        </form>
    );
}

export default SearchBar;

import SearchBar from "../components/SearchBar.tsx";
import styles from "./Home.module.css";

function Home() {
    return (
        <div className={styles.wrap}>
            <h2>Google Books 검색</h2>
            <SearchBar />
        </div>
    );
}

export default Home;

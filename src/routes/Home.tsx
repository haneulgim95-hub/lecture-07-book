import SearchBar from "../components/components/SearchBar.tsx";
import styles from "./Home.module.css";

function Home() {
    return (
        <div className={styles.wrap}>
            <h2>Google books 검색</h2>
            <SearchBar />
        </div>
    );
}

export default Home;

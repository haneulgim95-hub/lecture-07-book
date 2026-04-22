import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export type BookItem = {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        description?: string;
        publishedDate: string;
        imageLinks?: {
            thumbnail?: string;
            small?: string;
        };
    };
};

type ApiResponseType = { items: BookItem[] };

// styled. 으로 연결할 때에는 기본 태그일 때
const Container = styled.div`
    padding: 30px;
`;

const Content = styled.div`
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

// styled()로 연결할 때에는 컴포넌트일 때 
// 이 StyleLink라는 애는, Link의 기능을 물려받은 스타일링 적용한 컴포넌트가 됨 
const StyledLink = styled(Link)`
    text-decoration: none;
    border-radius: 8px;
    padding: 12px;
    background-color: white;
    border: 1px solid #d2d1d1;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.5s;
    
    // 이건 styled-components의 문법이 아니라, 
    // sass (향상된 CSS) 문법임
    &:hover {
        background-color: #f3f3f3;
    }
`;

const Cover = styled.img`
    width: 60px;
    height: 90px;
    object-fit: cover;
    border-radius: 4px;
`;

const NoCover = styled.div`
    width: 60px;
    height: 90px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BookTitle = styled.h3`
    font-weight: 600;
    margin-bottom: 4px;
`;

const Authors = styled.div`
    font-size: 12px;
    color: #555;
`;

function Search() {
    // 이 컴포넌트의 목적 : 사용자가 요청한 keyword를 받아서, 그걸 가지고 google API 요청을 하고, 받아온 결과를 화면에 출력해주는 일

    // query string으로 들어온 값을 꺼내오기 위해서는 useSearchParams를 사용

    // useParams를 사용할 떄는 const {id} = useParams();
    // useSearchParams는 useState와 사용법이 동일
    const [params] = useSearchParams(); // queryString 내용이 params에 담겨 나옴
    // 이렇게 가져온 searchParams라고 하는 state의 값은 객체
    //search?page=1&size=5&keyword=수학
    // {page: 1, size: 5, keyword: "수학"}
    // params.keyword로 값을 가져오면 영어+특수문자의 조합을 가져온다. 따라서 get으로 가져온다.
    const k = params.get("keyword"); // "수학" 이라는게 있을 수도 있지만, 없을 수도 있음 (k : string | null) >> 쿼리스트링은 사용자가 지울수도 있다.

    // keyword 준비 됐으니, API를 통해 요청한 정보를 받아다가 화면에 출력만 해주면 됨
    const [list, setList] = useState<BookItem[]>([]);

    useEffect(() => {
        if (!k) return;

        fetch(`https://www.googleapis.com/books/v1/volumes?q=${k}&maxResults=20&key=${API_KEY}`)
            .then(res => res.json())
            .then((json: ApiResponseType) => {
                setList(json.items);
            })
            .catch(err => {
                console.log(err);
            });
    }, [k]);

    // 로딩에 대해서 처리를 굳이 해줘야 하나? => 오히려 loading이 빠르게 지나가면 깜빡꺼리는 느낌이 들고, 사용자는 방금 뭐였지?? 싶은 생각이 든다.
    // 로딩이 true
    // if (loading) return <div>Loading...</div>    => 처리를 안해준다! 그래서 이 화면에서 loading이라는 state는 만들지 않았다.
    // loading이 오래 걸릴것 같고 사용자에게 이러한 안내가 필요할것 같은 상황에만 loading을 만들어준다.

    return (
        <Container>
            <h3>검색 결과: {k}</h3>

            {/* 검색 결과 (책 목록) 출력*/}
            {/* 데이터가 도착했는지 안했는지, 즉 목록이 있는지 없는지 판단 해줘야 하나? */}
            {/* map이라고 하는 메소드는 꼭 대상이 array여야만 쓸 수 있으니, list && 로 체크해줄 떈,
            list가 null이 되나?를 생각해봐야겠지만, 여기서 모든 조건을 따+
            9851740져봤을 때 list는
            무조건 array이긴 하니깐 굳이 논리곱으로 체긐해줄 필요가 없다. */}

            <Content>
                {list.map(value => (
                    <StyledLink key={value.id} to={`/detail/${value.id}`}>
                        {value.volumeInfo.imageLinks?.thumbnail ? (
                            <Cover
                                src={value.volumeInfo.imageLinks?.thumbnail}
                                alt={value.volumeInfo.title}
                            />
                        ) : (
                            <NoCover>No cover</NoCover>
                        )}

                        <div>
                            <BookTitle>{value.volumeInfo.title}</BookTitle>
                            {/*
                                array에서 사용할 수 있는 메소드 join(문자열)
                                각 요소를 순회해서 하나의 값을 리턴하는데
                                각 요소 사이에 [매개변수로 제공된 스트링] 를 넣어준다.
                            */}
                            <Authors>{value.volumeInfo.authors?.join(", ")}</Authors>
                        </div>
                    </StyledLink>
                ))}
            </Content>
        </Container>
    );
}

export default Search;

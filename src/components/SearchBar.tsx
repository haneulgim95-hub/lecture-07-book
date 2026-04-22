import { type ChangeEvent, type SubmitEvent, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Box = styled.form`
    display: flex;
    gap: 10px;
    width: 100%;
`;

const Button = styled.button`
    padding: 12px 18px;
    border: none;
    background-color: black;
    color: white;
    border-radius: 8px;
    cursor: pointer;
`;

const Input = styled.input`
    flex: 1;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
`;

function SearchBar() {
    // 사용자에게 입력을 받아서, 그걸 /search라고 하는 주소로 강제 이동 시켜야됨
    const navigate = useNavigate(); // navigate라고 하는 변수에 이동에 관련된 기능을 담아둬야 함
    const [keyword, setKeyword] = useState(""); // input에 입력되는 값을 관리할 목적의 state

    // fetch는 순수자바스크립트의 기능이라, Import 필요 없었음
    // SubmitEvent라고 하는 타입이, 순수 자바스크립트에도 있고 React에도 있음
    // => import를 안해오면 엔진은 "아 순수자바스크립트꺼?"
    // => 자동 import가 안됨으로 직접 적어줘서 import 해줘야 한다.
    const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        // form에 onSubmit라고 하는 기능은, 브라우저 측에 기본 기능이 "새로고침 하고 전달"이 있음
        // 이걸 하지 못하도록 해야 함.
        e.preventDefault();

        // 생각보다, 이 input에 스페이스바를 넣는 애들도 엄청 많음 "수학" => " 수학"
        // string의 맨 앞과 맨 뒤에 존재할 수 있는 공백을 제거하는 메서드 : trim()
        // "" 에서 사용자가 enter => keyword.trim() -> ""    -> if (keyword.trim()) -> false
        // " " 에서 사용자가 enter => keyword.trim() -> ""
        const k = keyword.trim();
        if (!k) return; // trim을 했더니, 값이 빈 스트링이면 return으로 끝내라

        // keyword를 활용해서 사용자를 강제 이동
        // search라고 하는 경로에, query string으로 keyword를 전달해서 사용자 이동
        // Link는 사용자가 눌러줘야 하는데. useNavigate는 강제 이동이다!
        // URL은 한글이 x, 영어랑 몇 가지의 특수문자만 가능
        // 해석을 할 수 있도록 영어랑 몇 가지의 특수문자를 이용해 변환 작업이 필요함 -> encodeURIComponent()
        navigate(`/search?keyword=${encodeURIComponent(k)}`);
    };

    const onChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        // 사용자가 입력한 값을 받아다가, keyword라고 하는 state에 저장
        // 사용자가 입력한 값은 => event.target.value
        setKeyword(e.target.value);
    };

    return (
        <Box onSubmit={onSubmit}>
            <Input onChange={onChange} />
            <Button type={"submit"}>
                검색
            </Button>
        </Box>
    );
}

export default SearchBar;


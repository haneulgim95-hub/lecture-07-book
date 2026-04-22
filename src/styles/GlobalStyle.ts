// styled-components에서 제공하는 createGlobalStyle을 이용해
// 전체 화면에서 제공되는 글로벌 스타일을 정의

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    a {
        text-decoration: none;
        color: inherit; /* inherit: 부모 요소의 색상을 따르겠음. a태그는 기본적으로 color가 파란색임. 그게 싫어서 기본적으로 color를 부모의 색상인 검정색으로.*/
    }`;

export default GlobalStyle;

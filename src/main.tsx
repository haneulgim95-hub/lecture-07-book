import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <App />
)

// 1. 코드는 정상이야 => 값이 잘 나올때가 있어
//2. 똑같은 내용으로 테스트를 여러 번 진행을 해봤는데 가끔 오류가 날 때가 있음 (개발 중일 때만 오류가 남)
// => 데이터를 외부에서 받아올 떄
// => 이 이유는, main.tsx의 "Strict Mode"

// Strict Mode는 React가 개발중일 떄 개발을 도와주기 위해서 만들어놓은 모드
// Strict Mode의 기능 중 하나는 데이터를 외부에서 받아올 때 실패가 될때를 대비해서 여러 번 request를 보내게 됨

// 받는 서버 입장에서는 , 똑같은 IP에 똑같은 API를 똑같은 내용을 담아 여러 번 도착되는 상황
// 당연히 받는 서버는 거부처리를 하게 됨
// 그 문제를 해결하기 위해서는 Strict Mode를 삭제해주면 된다!
import { useState } from "react";
import "./App.css";
import { arrData } from "./arrData";
import uuid from "react-uuid";
import styled from "styled-components";
import nameData from "./nameData.json";
import { Link } from "react-router-dom";

//styled components화 ;;
const Stbox = styled.div`
    border: 1px solid black;
    width: 200px;
    margin: 30px auto;
    padding: 50px;
`;

const YellowboxBtn = styled.button`
    cursor: pointer;
    width: 150px;
    height: 50px;
    border-radius: 5px;
    background-color: #fec8c9;
    border: none;
    &:hover {
        background-color: #444f59;
        color: white;
    }
`;

const InputBox = styled.div`
    border: 1px solid black;
    width: 500px;
    margin: 30px auto;
    padding: 50px;
`;

function App() {
    // totalReviews: 전체 데이터를 저장하는 DB라고 가정
    const [totalReviews, settotalReviews] = useState(arrData);
    // reviews: 실제로 화면에 보이는 review들 (필터링 유무)
    const [reviews, setfilteredReviews] = useState(totalReviews);

    const [nickname, setNickname] = useState("");
    const [contents, setCotents] = useState("");
    // 응원글 등록하는 선수
    const [players, setPlayers] = useState("손흥민");

    return (
        <div>
            <header>
                <div className="header-wrap">
                    <img src="img/son.jpg" className="header-image" />
                    <div className="header_name">TottenHamHotSpur</div>
                </div>

                <div>
                    <div className="header-middle-name">
                        {nameData.map((playerName) => {
                            return (
                                <YellowboxBtn
                                    key={playerName.id}
                                    value={playerName.name}
                                    onClick={(e) => {
                                        const filteredArea =
                                            totalReviews.filter((review) => {
                                                return (
                                                    review.writedTo ===
                                                    e.target.value
                                                );
                                            });
                                        setfilteredReviews(filteredArea);
                                    }}
                                >
                                    {playerName.id}.{playerName.name}
                                </YellowboxBtn>
                            );
                        })}
                    </div>
                </div>

                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        const newReviews = {
                            id: uuid(),
                            nickname: nickname,
                            content: contents,
                            writedTo: players,
                        };
                        // 추가했으니 전체 review (DB)에서 하나 추가됨
                        settotalReviews([...totalReviews, newReviews]);
                        // 화면에 보여지는 애가 전체 리뷰와 새로운 리뷰로 변경됨
                        setfilteredReviews([...totalReviews, newReviews]);
                    }}
                    className="input-wrap"
                >
                    {" "}
                    <InputBox>
                        <div>
                            <div>닉네임 :</div>
                            <input
                                value={nickname}
                                onChange={(event) => {
                                    setNickname(event.target.value);
                                }}
                                type="text"
                            />
                        </div>
                        <div>
                            <div>내용 :</div>
                            <input
                                value={contents}
                                onChange={(event) => {
                                    setCotents(event.target.value);
                                }}
                                type="text"
                            />
                        </div>
                        <div>
                            <div>To? </div>
                            <select
                                value={players}
                                onChange={(event) => {
                                    setPlayers(event.target.value);
                                }}
                            >
                                <option value="손흥민">손흥민</option>
                                <option value="매디슨">매디슨</option>
                                <option value="반더벤">반더벤</option>
                                <option value="비카리오">비카리오</option>
                            </select>
                        </div>
                        <button>응원글 등록하기</button>
                    </InputBox>
                </form>
            </header>
            <main>
                {reviews.map(function (review) {
                    return (
                        <Link to={`/${review.id}`}>
                            <Stbox key={review.id}>
                                <div>{review.nickname}</div>
                                <div>업로드 시간 </div>
                                <div>{review.content}</div>
                                <div>{review.writedTo}</div>
                            </Stbox>
                        </Link>
                    );
                })}
            </main>

            <footer>푸터</footer>
        </div>
    );
}

export default App;

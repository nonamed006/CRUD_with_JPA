import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PORT } from '../set';

const Cont = styled.div`
    margin: 2% 35% 2% 35%; 
    height: 700px;
    `

const Box = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid lightgrey;
    border-radius: 15px;
`
const Headline = styled.div`
    width: 100%;
    height: 50px;
  	padding-top: 6px; 
    border-bottom: 1px solid lightgrey;
		color: #20c997;
		font-weight: bolder;
		font-size: 30px;
`
const MainBoard = styled.div`
    width: 100%;
    height: 580px;
    border-bottom: 1px solid lightgrey;
`
const Intxt = styled.div`
    width: 100%;
    padding: 10px 0px 10px 0px;
    align-item: center;
		border-bottom: 1px solid lightgrey;
`
const Button = styled.button`
	width: 60px;
	height: 35px;
	color: white;
	font-weight: bold;
	background-color: #20c997;
	padding: 5px 8px 5px 8px;
	border:none;
	border-radius: 5px;
	cursor: pointer;
`
const InputBox = styled.input`
	margin-right: 20px;
	width: 400px;
	padding: 6px;
	outline: none;
	border: none;
	border-bottom: 1px solid #20c997;
`

const BottomIn = styled.div`
	padding-top: 15px;
`
const Board = () => {
	const [boardList, setBoardList] = useState([]);
	const [reload, setReload] = useState(false);
	const [board, setBoard] = useState({
		contents: "",
		reg_date: "2022",
		writter: "작성자"
	});

	const getBoard = () => {
		fetch(`${PORT}/board/all`, {
			method: "get",
			// res에 결과가 들어옴
		}).then((res) => res.json())
			.then((res) => {
				console.log(res);
				setBoardList(res);
			});
	};

	const createBoard =()=>{
		fetch(`${PORT}/board/write`, {
			method: "post",
			body: JSON.stringify(board),
			headers: {
				'Content-Type': 'application/json'
			}
			// res에 결과가 들어옴
		}).then((res) => res.text())
			.then((res) => {
				console.log(res);
				setReload(!reload);
			});
	};

	const deleteBoard = (no) => {
		console.log(no);
		fetch(`${PORT}/board/del/${no}`, {
			method: "get",
			// res에 결과가 들어옴
		}).then((res) => res.text())
			.then((res) => {
				console.log(res);
				setReload(!reload);
			});
	};

	useEffect(()=>{
		getBoard();
	}, [reload]);

	const handleChange = (e) =>{
		setBoard({...board, [e.target.id]: e.target.value});
	}

	return (
		<Cont>
			<Box>
				<Headline>
					Board
				</Headline>
				<MainBoard>
				{boardList.map(function (res, index) {
					return <Intxt key={index}>
						{res.contents}
						<div onClick={(e)=>deleteBoard(res.no)} style={{float:'right', marginRight: '10px', fontWeight: 'bold', color: '#20c997', cursor: 'pointer'}}>X</div>
					</Intxt>
					})}
				</MainBoard>
				<BottomIn>
					<InputBox id = "contents" onChange={handleChange}></InputBox>
					<Button onClick={createBoard}>버튼</Button>
					</BottomIn>
			</Box>
		</Cont>
	);
};

export default Board;
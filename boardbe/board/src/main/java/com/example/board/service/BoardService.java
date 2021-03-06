package com.example.board.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.board.model.Board;
import com.example.board.repository.BoardRepository;

@Service
public class BoardService {

	private BoardRepository boardRepository;
	
	public BoardService(BoardRepository boardRepository) {
		this.boardRepository  = boardRepository;
	}
	
	// insert
	public Board insert(Board board) {
		System.out.println(board);
		return this.boardRepository.save(board);
	}
	// select all
	public List<Board> all(){
		return this.boardRepository.findAll();
	}
	// delete
	public void delete(int no) {
		boardRepository.deleteById(no);
	}
}

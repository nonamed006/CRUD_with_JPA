package com.example.board.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.board.model.Board;
import com.example.board.service.BoardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

	private final BoardService boardService;
	
	@PostMapping("/write")
	public ResponseEntity<Board> insert(Board board){
		return ResponseEntity.ok(boardService.insert(board));
	}
	
	// select
	@GetMapping("/all")
	public List<Board> all(){
		List<Board> boardList = this.boardService.all();
		return boardList;
	}
}
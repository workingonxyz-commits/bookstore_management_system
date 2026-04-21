package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repository.BookRepository;
import com.example.demo.model.Book;

@RestController
@CrossOrigin
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookRepository repo;

    // ✅ GET ALL BOOKS
    @GetMapping
    public List<Book> getAll() {
        return repo.findAll();
    }

    // ✅ ADD BOOK
    @PostMapping
    public Book add(@RequestBody Book b) {
        return repo.save(b);
    }

    // ✅ UPDATE BOOK
    @PutMapping("/{id}")
    public Book update(@PathVariable int id, @RequestBody Book b) {
        b.setId(id);
        return repo.save(b);
    }

    // ✅ DELETE BOOK
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        repo.deleteById(id);
    }
}
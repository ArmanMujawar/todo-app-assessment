package com.nich.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nich.entity.Todo;
 // Updated to use the correct service name
import com.nich.service.Todoservice;

@CrossOrigin // Allow cross-origin requests
@RestController
@RequestMapping("/todos") // Base URL for the Todo resources
public class controller {

    @Autowired
    private Todoservice todoService; // Updated to use the correct service name

    // Get all Todos
    @GetMapping
    public List<Todo> getTodos() {
        return todoService.getAll(); // Call the service method to get all todos
    }

    // Create a new Todo
    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        return todoService.create(todo); // Call the create method in the service
    }

    // Update an existing Todo
    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Integer id, @RequestBody Todo todo) {
        return todoService.update(id, todo); // Call the update method in the service
    }

    // Delete a Todo by ID
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Integer id) {
        todoService.deleteTodo(id); // Call the delete method in the service
    }
}

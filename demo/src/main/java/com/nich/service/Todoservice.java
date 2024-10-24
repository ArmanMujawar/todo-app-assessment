package com.nich.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nich.entity.Todo;
 // Adjust the import to match your repository name
import com.nich.repository.repository;

@Service
public class Todoservice {
    
    @Autowired
    private repository todoRepository; // More descriptive name
    
    // Get all Todos
    public List<Todo> getAll() {
        return todoRepository.findAll();
    }
    
    // Create a new Todo
    public Todo create(Todo todo) {
        return todoRepository.save(todo);
    }
    
    // Update an existing Todo
    public Todo update(Integer id, Todo todo) {
        Todo existingTodo = todoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Cannot find Todo with id: " + id));
        existingTodo.setDescription(todo.getDescription()); // Adjusted to use correct field
        existingTodo.setTextArea(todo.getTextArea()); // Added text area update
        existingTodo.setCompleted(todo.isCompleted());
        return todoRepository.save(existingTodo);
    }
    
    // Delete a Todo by id
    public void deleteTodo(Integer id) {
        if (!todoRepository.existsById(id)) { // Check if Todo exists before deletion
            throw new RuntimeException("Cannot delete Todo with id: " + id + ", as it does not exist.");
        }
        todoRepository.deleteById(id);
    }
}

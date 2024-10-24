package com.nich.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@Table(name = "todos") // Optional: Customize the table name
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "text_area", length = 500)
    private String textArea;

    @Column(name = "completed")
    private boolean isCompleted; // Changed to isCompleted for clarity

    // No-argument constructor
    public Todo() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTextArea() {
        return textArea;
    }

    public void setTextArea(String textArea) {
        this.textArea = textArea;
    }

    public boolean isCompleted() {
        return isCompleted; // Updated to match the new naming
    }

    public void setCompleted(boolean isCompleted) {
        this.isCompleted = isCompleted; // Updated to match the new naming
    }

    @Override
    public String toString() {
        return "Todo [id=" + id + ", description=" + description + ", textArea=" + textArea + ", completed=" + isCompleted + "]";
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Todo)) return false;
        Todo todo = (Todo) obj;
        return id == todo.id;
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(id);
    }
}

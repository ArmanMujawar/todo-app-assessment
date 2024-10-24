let todos = [];

    // Fetch existing todos from the backend when the page loads
    window.onload = function () {
        fetchExistingTodos();
    };

    function fetchExistingTodos() {
        fetch("http://localhost:8080/todos")
            .then(response => response.json())
            .then(data => {
                todos = data; // Store fetched todos in the global variable
                updateTodoTable(); // Display todos in the table
            })
            .catch(error => {
                console.error("Error fetching todos:", error);
            });
    }


    function updateTodoTable() {
        const todoTableBody = document.getElementById("todoTableBody");
        todoTableBody.innerHTML = ""; // Clear previous table rows

        todos.forEach(todo => {
            const row = document.createElement("tr");

            const idCell = document.createElement("td");
            idCell.textContent = todo.id; // Display the ID from the database

            const descriptionCell = document.createElement("td");
            descriptionCell.textContent = todo.descriptionString;

            const statusCell = document.createElement("td");
            statusCell.textContent = todo.isCompleted ? "Completed" : "Pending"; // Correctly display status

            // Action Buttons
            const actionsCell = document.createElement("td");
        // Complete button
        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.onclick = () => completeTodo(todo.id); 
        actionsCell.appendChild(completeButton);

        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.onclick = () => updateTodo(todo.id); 
        actionsCell.appendChild(updateButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteTodo(todo.id); 
        actionsCell.appendChild(deleteButton);

        row.appendChild(idCell);
        row.appendChild(descriptionCell);
        row.appendChild(statusCell);
        row.appendChild(actionsCell);

        todoTableBody.appendChild(row);
    });
}

// Handle form submission for adding a new todo
const todoForm = document.getElementById("todoForm");
todoForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const description = document.getElementById("descriptionInput").value; // Assuming you have this input

    // Send the new todo to the backend
    fetch("http://localhost:8080/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            description: description, // Correctly use the 'description' field
            completed: false, // Default to not completed
        }),
    })
    .then((response) => response.json())
    .then((newTodo) => {
        console.log("Added new todo:", newTodo); // Log the newly added todo
        todos.push(newTodo); // Add the new todo to the local list
        updateTodoTable(); // Refresh the table
        todoForm.reset(); // Clear the form after submission
    })
    .catch((error) => {
        console.error("Error adding todo:", error);
    });
});

// Complete a Todo
function completeTodo(id) {
    const todoToComplete = todos.find((todo) => todo.id === id);
    if (todoToComplete && !todoToComplete.completed) {
        // Only allow completing if not already completed
        fetch(`http://localhost:8080/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: todoToComplete.description, // Maintain the description
                completed: true, // Set as completed
            }),
        })
        .then((response) => response.json())
        .then((updatedTodo) => {
            console.log("Updated todo:", updatedTodo); // Log the updated todo
            const index = todos.findIndex((todo) => todo.id === id);
            todos[index] = updatedTodo; // Update the local list
            updateTodoTable(); // Refresh the table
        })
        .catch((error) => {
            console.error("Error completing todo:", error);
        });
    } else {
        alert("Todo is already completed!");
    }
}

// Update an existing Todo
function updateTodo(id) {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (todoToUpdate) {
        const newDescription = prompt("Enter new description:", todoToUpdate.description);
        const newCompleted = confirm("Is it completed?");

        if (newDescription !== null) {
            fetch(`http://localhost:8080/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    description: newDescription, // Use the correct field name
                    completed: newCompleted,
                }),
            })
            .then((response) => response.json())
            .then((updatedTodo) => {
                console.log("Updated todo after edit:", updatedTodo); // Log the updated todo
                const index = todos.findIndex((todo) => todo.id === id);
                todos[index] = updatedTodo; // Update the local list
                updateTodoTable(); // Refresh the table
            })
            .catch((error) => {
                console.error("Error updating todo:", error);
            });
        }
    }
}

// Delete a Todo
function deleteTodo(id) {
    if (confirm("Are you sure you want to delete this todo?")) {
        fetch(`http://localhost:8080/todos/${id}`, {
            method: "DELETE",
        })
        .then(() => {
            todos = todos.filter((todo) => todo.id !== id); // Remove deleted todo from local list
            updateTodoTable(); // Refresh the table
        })
        .catch((error) => {
            console.error("Error deleting todo:", error);
        });
    }
}

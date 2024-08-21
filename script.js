document.getElementById('addBtn').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter a task!',
            confirmButtonColor: '#4ca1af'
        });
        return;
    }

    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';

    const taskTextNode = document.createTextNode(taskText);
    listItem.appendChild(taskTextNode);

    // Create an "Edit" button for the list item
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';

    // Create a "Delete" button for the list item
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';

    // Append buttons to the list item
    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);

    // Edit button functionality
    editBtn.addEventListener('click', function() {
        Swal.fire({
            title: 'Edit Task',
            input: 'text',
            inputValue: taskText,
            showCancelButton: true,
            confirmButtonColor: '#4ca1af',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save'
        }).then((result) => {
            if (result.isConfirmed) {
                const newText = result.value.trim();
                if (newText !== '') {
                    taskTextNode.textContent = newText;
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Task cannot be empty!',
                        confirmButtonColor: '#4ca1af'
                    });
                }
            }
        });
    });

    // Remove button functionality
    deleteBtn.addEventListener('click', function() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e74c3c',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                taskList.removeChild(listItem);
                Swal.fire(
                    'Deleted!',
                    'Your task has been deleted.',
                    'success'
                );
            }
        });
    });

    // Toggle completed class when clicking the list item
    listItem.addEventListener('click', function() {
        listItem.classList.toggle('completed');
    });

    // Append the list item to the task list
    taskList.appendChild(listItem);

    // Clear the input field
    taskInput.value = '';
});




<!DOCTYPE html>
<html>
<head>
    <title>Student Information System</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f0f4f8;
            text-align: center;
            margin: 20px;
        }

        h1 {
            color: #163a70;
        }

        .container {
            background: white;
            padding: 20px;
            max-width: 900px;
            margin: auto;
            border-radius: 10px;
            box-shadow: 0 0 10px #ccc;
        }

        input {
            padding: 10px;
            margin: 6px;
            width: 180px;
        }

        button {
            padding: 10px 18px;
            margin: 8px;
            border: none;
            border-radius: 5px;
            background: #1769aa;
            color: white;
            cursor: pointer;
        }

        button:hover {
            background: #0d4778;
        }

        .delete {
            background: #dc3545;
        }

        table {
            width: 100%;
            margin-top: 20px;
            border-collapse: collapse;
            background: white;
        }

        th, td {
            border: 1px solid #ccc;
            padding: 10px;
        }

        th {
            background: #1769aa;
            color: white;
        }

        #message {
            color: #d22;
        }
    </style>
</head>

<body>

<div class="container">
    <h1>Student Information System</h1>
    <h3>Student Details and Marks</h3>

    <form id="studentForm">
        <input id="roll" type="number"
               placeholder="Student Roll Number" required>

        <input id="name" type="text"
               placeholder="Student Name" required>

        <input id="className" type="text"
               placeholder="Class" required>

        <input id="section" type="text"
               placeholder="Section" required>

        <br>

        <input id="telugu" type="number"
               placeholder="Telugu Marks (0-100)"
               min="0" max="100" required>

        <input id="english" type="number"
               placeholder="English Marks (0-100)"
               min="0" max="100" required>

        <input id="maths" type="number"
               placeholder="Maths Marks (0-100)"
               min="0" max="100" required>

        <br>

        <button type="submit">Add Student</button>
    </form>

    <p id="message"></p>

    <h3>All Student Information</h3>

    <table>
        <thead>
            <tr>
                <th>Roll No.</th>
                <th>Name</th>
                <th>Class</th>
                <th>Section</th>
                <th>Telugu</th>
                <th>English</th>
                <th>Maths</th>
                <th>Total</th>
                <th>Percentage</th>
                <th>Grade</th>
                <th>Action</th>
            </tr>
        </thead>

        <tbody id="studentTable"></tbody>
    </table>
</div>

<script>
    const form = document.getElementById("studentForm");
    const table = document.getElementById("studentTable");
    const message = document.getElementById("message");

    let students = [];

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const roll = document.getElementById("roll").value;
        const name = document.getElementById("name").value.trim();
        const className = document.getElementById("className").value.trim();
        const section = document.getElementById("section").value.trim();

        const telugu = Number(document.getElementById("telugu").value);
        const english = Number(document.getElementById("english").value);
        const maths = Number(document.getElementById("maths").value);

        if (students.some(s => s.roll === roll)) {
            message.textContent = "Roll number already exists!";
            return;
        }

        if ([telugu, english, maths].some(
            mark => mark < 0 || mark > 100
        )) {
            message.textContent = "Marks must be between 0 and 100.";
            return;
        }

        const total = telugu + english + maths;
        const percentage = (total / 300 * 100).toFixed(2);

        let grade;
        if ([telugu, english, maths].some(mark => mark < 35)) {
            grade = "Fail";
        } else if (percentage >= 90) {
            grade = "A+";
        } else if (percentage >= 80) {
            grade = "A";
        } else if (percentage >= 70) {
            grade = "B";
        } else if (percentage >= 60) {
            grade = "C";
        } else if (percentage >= 35) {
            grade = "D";
        } else {
            grade = "Fail";
        }

        students.push({
            roll, name, className, section,
            telugu, english, maths,
            total, percentage, grade
        });

        message.textContent = "Student added successfully!";
        form.reset();
        displayStudents();
    });

    function displayStudents() {
        table.innerHTML = "";

        students.forEach((s, index) => {
            const row = document.createElement("tr");

            [
                s.roll, s.name, s.className, s.section,
                s.telugu, s.english, s.maths,
                s.total, s.percentage + "%", s.grade
            ].forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

            const actionCell = document.createElement("td");
            const deleteButton = document.createElement("button");

            deleteButton.textContent = "Delete";
            deleteButton.className = "delete";

            deleteButton.addEventListener("click", function() {
                students.splice(index, 1);
                displayStudents();
                message.textContent = "Student deleted.";
            });

            actionCell.appendChild(deleteButton);
            row.appendChild(actionCell);
            table.appendChild(row);
        });
    }
</script>

</body>
</html>

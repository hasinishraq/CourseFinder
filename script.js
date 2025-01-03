let courseData = [];

// Load JSON data
fetch('courses.json')
    .then(response => response.json())
    .then(data => courseData = data);

function showSuggestions() {
    const searchBox = document.getElementById("searchBox");
    const suggestionsBox = document.getElementById("suggestions");
    const query = searchBox.value.trim().toUpperCase();

    // Clear previous suggestions
    suggestionsBox.innerHTML = "";

    if (query.length === 0) {
        return;
    }

    // Filter courses based on user input
    const suggestions = courseData.filter(course =>
        course.course_code.toUpperCase().includes(query) || 
        course.course_name.toUpperCase().includes(query)
    );

    // Show suggestions
    suggestions.forEach(course => {
        const div = document.createElement("div");
        div.classList.add("suggestion-item");
        div.innerText = `${course.course_code}: ${course.course_name}`;
        div.onclick = function () {
            searchBox.value = course.course_code;
            suggestionsBox.innerHTML = "";
            searchCourse();
        };
        suggestionsBox.appendChild(div);
    });
}

function searchCourse() {
    const searchBox = document.getElementById("searchBox").value.trim().toUpperCase();
    const resultBox = document.getElementById("result");

    if (searchBox === "") {
        resultBox.innerHTML = "Please enter a course code or name.";
        return;
    }

    const result = courseData.find(course =>
        course.course_code.toUpperCase() === searchBox ||
        course.course_name.toUpperCase() === searchBox
    );

    if (result) {
        resultBox.innerHTML = `
            <strong>Course Code:</strong> ${result.course_code} <br>
            <strong>Course Name:</strong> ${result.course_name} <br>
            <strong>Exam Day:</strong> ${result["exam day"] || "Not Available"}
        `;
    } else {
        resultBox.innerHTML = "Course not found.";
    }
}

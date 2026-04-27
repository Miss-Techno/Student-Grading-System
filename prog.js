    "strict use"
    function initiate() {
        document.getElementById('GradesBtn').onclick = processData;
        document.getElementById('SaveBtn').onclick = saveFile;
    }
    window.onload = initiate;
    // Read File
    document.getElementById("fileInput").addEventListener("change", function(event) {
        const file = event.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function(e) {
            document.getElementById("textArea").value = e.target.result;
        };

        reader.readAsText(file);
    });

    // Process Data
    function processData() {
    let text = document.getElementById("textArea").value;

    if (!text) {
        alert("Textarea is empty!");
        return;
    }

    let lines = text.split("\n");
    let newText = "";

    for (let i = 0; i < lines.length; i++) {

        if (lines[i].trim() === "") continue;

        let parts = lines[i].split(",");

        if (parts.length < 2) {
            alert("Invalid format on line: " + lines[i]);
            return;
        }

        let name = parts[0].trim();
        let mark = parseInt(parts[1]);

        if (isNaN(mark)) {
            alert("Invalid number for: " + name);
            return;
        }

        let grade = "";

        if (mark >= 85) grade = "High Distinction";
        else if (mark >= 75) grade = "Distinction";
        else if (mark >= 65) grade = "Credit";
        else if (mark >= 50) grade = "Pass";
        else grade = "Fail";

        newText += name + ", " + mark + ", " + grade + "\n";
    }

    document.getElementById("textArea").value = newText;
    }

    // Save File
    function saveFile() {
        let text = document.getElementById("textArea").value;

        const blob = new Blob([text], { type: "text/plain" });
        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = "graded_students.txt";

        link.click();
    }
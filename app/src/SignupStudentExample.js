import './App.css';
import {useState} from 'react';
import axios from 'axios';

function App() {
    const [studentId, setStudentId] = useState("");
    const [classId, setClassId] = useState("");
    const [file, setFile] = useState(null);


    const handleFormSubmit = (event) => {
        event.preventDefault();

        let fileFormData = new FormData();
        fileFormData.append("student-id", studentId);
        fileFormData.append("class-id", classId);
        fileFormData.append("student-image", file, file.name);

        axios.post("http://127.0.0.1:5000/api/students/upload-image", fileFormData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            console.log("The response is: ", response);
        }).catch((error) => {
            console.error("The error is: ", error);
        });
    }


    return (
        <div className="App">
            <form onSubmit = {handleFormSubmit}>
                <input 
                    type = "text" name = "student-id"  
                    onChange = {event => setStudentId(event.target.value)}
                />
                <input 
                    type = "text" name = "class-id" 
                    onChange = {event => setClassId(event.target.value)}
                />
                <input 
                    type = "file" name = "student-image" 
                    onChange = {event => setFile(event.target.files[0])}
                />
                <input type = "submit" value = "register" />
            </form>
        </div>
    );
}

export default App;

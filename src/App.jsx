import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    id: 0,
    name: '',
    npm: '',
    major: '',
    entryYear: '',
  });
  const [editStudent, setEditStudent] = useState(null);

  const addStudent = () => {
    if (newStudent.name.trim() !== '' && newStudent.npm.trim() !== '' && newStudent.major.trim() !== '' && newStudent.entryYear.trim() !== '') {
      if (editStudent) {
        // Update existing student
        const updatedStudents = students.map(student =>
          student.id === editStudent.id ? newStudent : student
        );
        setStudents(updatedStudents);
        setEditStudent(null);
      } else {
        // Add new student
        setStudents([...students, { ...newStudent, id: students.length + 1 }]);
      }

      setNewStudent({
        id: 0,
        name: '',
        npm: '',
        major: '',
        entryYear: '',
      });
    }
  };

  const deleteStudent = (studentId) => {
    const updatedStudents = students.filter(student => student.id !== studentId);
    setStudents(updatedStudents);
    setEditStudent(null);
  };

  const editStudentClick = (student) => {
    setEditStudent(student);
    setNewStudent({ ...student });
  };

  return (
    <div>
      <h1>DATA MAHASISWA</h1>

      <div>
        <input
          type="text"
          placeholder="Nama"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="NPM"
          value={newStudent.npm}
          onChange={(e) => setNewStudent({ ...newStudent, npm: e.target.value })}
        />
        <input
          type="text"
          placeholder="Jurusan"
          value={newStudent.major}
          onChange={(e) => setNewStudent({ ...newStudent, major: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tahun Masuk"
          value={newStudent.entryYear}
          onChange={(e) => setNewStudent({ ...newStudent, entryYear: e.target.value })}
        />
        <button onClick={addStudent}>
          {editStudent ? 'Update Student Data' : 'Add Student Data'}
        </button>
      </div>

      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.npm} - {student.major} - Tahun Masuk: {student.entryYear}
            <button onClick={() => editStudentClick(student)}>Edit</button>
            <button onClick={() => deleteStudent(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

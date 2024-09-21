import { Button, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useEffect, useState } from "react";
import { createStudent } from "../api/students";
import { Student } from "../utils/data";

interface Props {
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  students: Student[];
}
function AddStudent({ setStudents, students }: Props) {
  const initialState = {
    _id: null,
    fullName: "",
    age: "",
    email: "",
    class: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    createStudent(formData)
      .then((res) => setStudents([...students, res]))
      .catch((err) => alert(err));
    setFormData(initialState);
  };

  useEffect(() => {
    if (formData.fullName === "admin") {
      alert("Admin account cannot be created");
      setFormData(initialState);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.fullName]);

  return (
    <Paper
      sx={{
        padding: 5,
        marginBottom: "25px",
        gap: 1,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
        // "& > :not(style)": { m: 1, width: "30ch" },
        "& > :last-child": { padding: 1.8, width: "35ch" },
      }}
    >
      <div
        style={{
          padding: 5,
          gap: "10px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TextField
          onChange={handleChange}
          value={formData.fullName}
          id="outlined-basic"
          label="Full Name"
          name="fullName"
          variant="outlined"
        />
        <TextField
          onChange={handleChange}
          value={formData.age}
          id="outlined-basic"
          label="Age"
          name="age"
          variant="outlined"
        />
        <TextField
          onChange={handleChange}
          value={formData.email}
          id="outlined-basic"
          label="Email"
          name="email"
          variant="outlined"
        />
        <TextField
          onChange={handleChange}
          value={formData.class}
          id="outlined-basic"
          label="Class"
          name="class"
          variant="outlined"
        />
      </div>

      <Button onClick={handleSubmit} variant="contained">
        Submit
      </Button>
    </Paper>
  );
}

export default AddStudent;

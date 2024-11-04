import CreateStudent from "./student/createStudent";
import SearchStudent from "./student/searchStudent";
import DeleteOldStudents from "./student/deleteOldStudents";

function App() {

  return (
    <div className="App">
      <CreateStudent></CreateStudent>
      <SearchStudent></SearchStudent>
      <DeleteOldStudents></DeleteOldStudents>
    </div>
  );
}

export default App;

import CreateStudent from "./student/createStudent";
import SearchStudent from "./student/searchStudent";
import DeleteOldStudents from "./student/deleteOldStudents";
import LogoutUser from "./user/logoutUser";

function App() {

  return (
    <div className="App">
      <CreateStudent></CreateStudent>
      <SearchStudent></SearchStudent>
      <DeleteOldStudents></DeleteOldStudents>
      <LogoutUser></LogoutUser>
    </div>
  );
}

export default App;

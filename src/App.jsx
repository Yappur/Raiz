import RoutesViews from "./routes/RoutesViews";
import { BrowserRouter as Router } from "react-router-dom";
import CustomToast from "./components/Modals/CustomToast";
function App() {
  return (
    <>
      <Router>
        <RoutesViews />
        <CustomToast />
      </Router>
    </>
  );
}

export default App;

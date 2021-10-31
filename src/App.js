import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import DetailPage from "./pages/DetailPage/DetailPage";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="bg-gray-500 text-gray-50 p-3">
          <p className="text-xl">Seek For Humanoid</p>
        </nav>

        <Switch>
          <Route exact path="/detail/:id" component={DetailPage} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

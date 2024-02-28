import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Layout from "./components/layout/Layout";

function App() {
  const history = createBrowserHistory();

  return (
    <Router>
      <Layout history={history} />
    </Router>
  );
}

export default App;

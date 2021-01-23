import { AppRouter } from "./router/AppRouter";
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  // sets the value of "message" to be "saved in browser storage"
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProducList from "./pages/productList";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDataUser } from "./redux/userSlice";
import CartDetail from "./pages/cartDetail";
import Transaction from "./pages/transaction";

function App() {

  const dispatch = useDispatch()

  const router = createBrowserRouter([
    { path: "/", element: <ProducList /> },
    { path: "/cart-detail/:userId", element: <CartDetail /> },
    { path: "/transaction/:userId", element: <Transaction/>}
  ]);

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:2000/api/users');
      dispatch(setDataUser(response.data.result))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div>
      <RouterProvider router={router}>
      </RouterProvider>
    </div>
  );
}

export default App;

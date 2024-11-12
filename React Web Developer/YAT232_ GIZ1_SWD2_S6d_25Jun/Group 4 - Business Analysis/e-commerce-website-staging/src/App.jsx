import useGenerateRoutes from "../routes/useGenerateRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../redux/reducers/usersSlice";
import BlurSpinner from "./components/BlurSpinner";
import PendingPage from "./pages/PendingPage";

function App() {
  const routes = useGenerateRoutes();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.users);
  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) dispatch(fetchUser(userId));
  }, []);

  return (
    <main className="bg-white dark:bg-[#242424]">
      {status === "pending" && <BlurSpinner />}
      {/* {status === "pending" && <PendingPage />} */}
      {routes}
    </main>
  );
}

export default App;

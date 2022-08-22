import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../features/Auth";
import Navigation from "../components/Navigation";
import MainLayout from "../layouts/MainLayout";
import MainHeader from "../components/MainHeader";
import Networking from "../pages/Networking";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <MainLayout Nav={Navigation} Header={MainHeader}>
        <Routes>
          <Route path="/hub" element={<div>hub</div>} />
          <Route path="/people" element={<div>people</div>} />
          <Route path="/events" element={<div>events</div>} />
          <Route path="/networking" element={<Networking />} />
          <Route path="*" element={<div>not found</div>} />
        </Routes>
      </MainLayout>
      {/*<Routes>*/}
      {/*  <Route path="/hub" element={<div>hub</div>} />*/}
      {/*  <Route path="/people" element={<div>people</div>} />*/}
      {/*  <Route path="/events" element={<div>events</div>} />*/}
      {/*  <Route path="/" element={<Navigation />} />*/}
      {/*  <Route path="auth" element={<Auth />} />*/}
      {/*  <Route path="nav" element={<Navigation />} />*/}
      {/*  <Route path="*" element={<div>not found</div>} />*/}
      {/*</Routes>*/}
    </BrowserRouter>
  );
};

export const NonUserRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Auth />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

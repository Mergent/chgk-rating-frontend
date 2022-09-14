import { BrowserRouter, Route, Routes } from "react-router-dom"
import useConfig from "../hooks/config"
import Login from "../pages/Login"
import Main from "../pages/Main"
import Teams from "../pages/Teams"
import Users from "../pages/Users"
import LayoutComp from "./Layout"

const RouterComp = () => {
  const { data: configData } = useConfig();
  
  return (
      <BrowserRouter>
        <LayoutComp>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="login" element={<Login />} />
            <Route path="users" element={<Users />} />
            <Route path="teams" element={<Teams />} />
          </Routes>
        </LayoutComp>
      </BrowserRouter>
  )
}

export default RouterComp
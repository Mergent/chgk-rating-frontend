import { BrowserRouter, Route, Routes, useRoutes } from "react-router-dom"
import useConfig from "../hooks/config"
import useGetCurrentUser from "../hooks/users/getCurrentUser"
import Login from "../pages/Login"
import Main from "../pages/Main"
import RolesComp from "../pages/roles.tsx/Roles"
import Teams from "../pages/Teams"
import User from "../pages/users/User"
import Users from "../pages/users/Users"
import LayoutComp from "./Layout"

const RouterComp = () => {
  const { data: configData } = useConfig();
  const { data: currentUser } = useGetCurrentUser()

  const elements = useRoutes([
    { path: '/', element: <Main />},
    { path: '/login', element: <Login />},
    { path: '/users', children: [
      { index: true, element: <Users />},
      { path: 'new', element: <User />}
    ]},
    { path: '/roles', children: [
      { index: true, element: <RolesComp />}
    ]},
    { path: '/teams', element: <Teams />}
  ])
  
  return (
    <LayoutComp>
      {elements}
    </LayoutComp>
  )
}

export default RouterComp
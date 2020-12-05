import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashbord";
import Category from "../pages/admin/Category";

const routes = [
  {
    path: "/admin/login",
    component: Login,
  },
  {
    path: "/admin",
    component: Dashboard,
  },
  {
    path: "/admin/categories",
    component: Category,
  },
];

export default routes;

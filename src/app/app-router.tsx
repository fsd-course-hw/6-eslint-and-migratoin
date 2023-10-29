import { BoardPage } from "@/pages/board";
import { BoardsPage } from "@/pages/boards";
import { UsersPage } from "@/pages/users";
import { RootLayout } from "@/widgets/root-layout";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { ROUTER_PATHS } from "@/shared/constants/routes";

const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.HOME,
    element: <RootLayout />,
    children: [
      {
        path: "",
        loader: () => redirect(ROUTER_PATHS.USERS),
      },
      {
        path: ROUTER_PATHS.BOARD,
        element: <BoardPage />,
      },
      {
        path: ROUTER_PATHS.BOARDS,
        element: <BoardsPage />,
      },
      {
        path: ROUTER_PATHS.USERS,
        element: <UsersPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

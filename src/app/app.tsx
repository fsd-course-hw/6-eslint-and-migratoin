import { AppLoader } from "./app-loader";
import { AppRouter } from "./app-router";

export function App() {
  return (
    <AppLoader>
      <AppRouter />
    </AppLoader>
  );
}

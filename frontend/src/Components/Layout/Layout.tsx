import { Outlet } from "react-router";
import { Navbar } from "../Navbar/Navbar";
import styles from "./Layout.module.css";

export function Layout() {
    return (
      <div className={styles.container}>
        <Navbar />
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    );
}

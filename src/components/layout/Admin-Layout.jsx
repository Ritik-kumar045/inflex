import { NavLink, Outlet, Navigate, useLocation } from "react-router-dom";
import { FaUser, FaHome, FaRegListAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";

export const AdminLayout = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div style={styles.loadingWrapper}>
        <div style={styles.spinner} />
      </div>
    );
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  const isExactAdminPage = location.pathname === "/admin";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div style={styles.layoutWrapper}>
      {/* Admin Sub-Nav */}
      <aside style={styles.sidebar}>
        <nav style={styles.sidebarNav}>
          {[
            { to: "/admin/users", icon: <FaUser />, label: "Users" },
            { to: "/admin/contact", icon: <FaMessage />, label: "Contact" },
            { to: "/service", icon: <FaRegListAlt />, label: "Services" },
            { to: "/", icon: <FaHome />, label: "Home" },
          ].map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {}),
              })}
            >
              <span style={styles.navIcon}>{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div style={styles.sidebarFooter}>v1.0.0</div>
      </aside>

      {/* Main Content */}
      <div style={styles.mainArea}>
        {/* Top bar */}
        <header style={styles.topbar}>
          {isExactAdminPage ? (
            <div style={styles.greetingBlock}>
              <span style={styles.greetingWave}>👋</span>
              <div>
                <div style={styles.greetingName}>Hello, {user.username}</div>
                <div style={styles.greetingDate}>{today}</div>
              </div>
            </div>
          ) : (
            <div style={styles.pageTitle}>
              {location.pathname
                .replace("/admin/", "")
                .replace("/", "")
                .charAt(0)
                .toUpperCase() +
                location.pathname
                  .replace("/admin/", "")
                  .replace("/", "")
                  .slice(1)}
            </div>
          )}
        </header>

        {/* Page Content */}
        <main style={styles.contentArea}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const styles = {
  layoutWrapper: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#0d0d0f",
    fontFamily: "'Sora', 'Segoe UI', sans-serif",
    color: "#e8e8f0",
  },

  // Sidebar
  sidebar: {
    width: "220px",
    minHeight: "100vh",
    backgroundColor: "#111116",
    borderRight: "1px solid #1e1e2e",
    display: "flex",
    flexDirection: "column",
    padding: "24px 0",
    position: "sticky",
    top: 0,
    flexShrink: 0,
  },
  sidebarBrand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "0 20px 28px 20px",
    borderBottom: "1px solid #1e1e2e",
    marginBottom: "12px",
  },
  brandDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "#6c63ff",
    boxShadow: "0 0 8px #6c63ff",
  },
  brandText: {
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#a0a0c0",
  },
  sidebarNav: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "0 12px",
    flex: 1,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 14px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#7070a0",
    textDecoration: "none",
    transition: "all 0.2s ease",
  },
  navItemActive: {
    backgroundColor: "#1a1a2e",
    color: "#9d97ff",
    borderLeft: "3px solid #6c63ff",
  },
  navIcon: {
    fontSize: "15px",
    opacity: 0.85,
  },
  sidebarFooter: {
    padding: "16px 20px 0",
    fontSize: "11px",
    color: "#3a3a5c",
    borderTop: "1px solid #1e1e2e",
    marginTop: "12px",
  },

  // Top bar
  mainArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  topbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 16px",
    borderBottom: "1px solid #1e1e2e",
    backgroundColor: "#111116",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  greetingBlock: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  greetingWave: {
    fontSize: "26px",
    lineHeight: 1,
  },
  greetingName: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#e8e8f0",
  },
  greetingDate: {
    fontSize: "12px",
    color: "#6060a0",
    marginTop: "2px",
  },
  pageTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#c8c8e8",
    textTransform: "capitalize",
  },
  topbarRight: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#6c63ff22",
    border: "2px solid #6c63ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "700",
    color: "#9d97ff",
  },

  // Content
  contentArea: {
    flex: 1,
    padding: "28px",
  },

  // Loading
  loadingWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#0d0d0f",
  },
  spinner: {
    width: "36px",
    height: "36px",
    border: "3px solid #1e1e2e",
    borderTop: "3px solid #6c63ff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
};

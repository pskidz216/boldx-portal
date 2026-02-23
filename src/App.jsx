import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import AuthScreen from "./components/AuthScreen";
import Dashboard from "./components/Dashboard";
import AppViewer from "./components/AppViewer";

export default function App() {
  const auth = useAuth();
  const [activeApp, setActiveApp] = useState(null);

  // Loading state
  if (auth.loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(135deg, #F0F2F5 0%, #E8EDF4 30%, #FFF5EB 60%, #F0F2F5 100%)",
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%", margin: "0 auto 16px",
            border: "3px solid rgba(0,0,0,0.06)", borderTopColor: "#E8871E",
            animation: "spin 1s linear infinite",
          }} />
          <div style={{ fontSize: 13, color: "#7A7A9A", fontWeight: 500 }}>Loading Portal...</div>
        </div>
      </div>
    );
  }

  // Not authenticated — show login
  if (!auth.user) {
    return (
      <AuthScreen
        onLogin={async (email, password, firstName, lastName, isSignup) => {
          if (isSignup) {
            await auth.signUp(email, password, firstName, lastName);
          } else {
            await auth.signIn(email, password);
          }
        }}
        onForgotPassword={auth.resetPassword}
        onGoogleSignIn={auth.signInWithGoogle}
        authError={auth.authError}
        authMessage={auth.authMessage}
        setAuthError={auth.setAuthError}
        setAuthMessage={auth.setAuthMessage}
      />
    );
  }

  // Authenticated — show portal
  return (
    <>
      <Dashboard
        user={auth.user}
        onSignOut={auth.signOut}
        onOpenApp={setActiveApp}
      />
      {activeApp && (
        <AppViewer
          appId={activeApp}
          onBack={() => setActiveApp(null)}
        />
      )}
    </>
  );
}

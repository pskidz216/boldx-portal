import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import AuthScreen from "./components/AuthScreen";
import Dashboard from "./components/Dashboard";
import AppViewer from "./components/AppViewer";

export default function App() {
  const auth = useAuth();
  const [activeApp, setActiveApp] = useState(null);
  const [isGuest, setIsGuest] = useState(false);

  // Loading state
  if (auth.loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(135deg, #e0c3fc 0%, #c9d6ff 30%, #d4eaf7 50%, #f0d5e0 70%, #fce4d6 100%)",
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%", margin: "0 auto 16px",
            border: "3px solid rgba(0,0,0,0.06)", borderTopColor: "#E8871E",
            animation: "spin 1s linear infinite",
          }} />
          <div style={{ fontSize: 13, color: "rgba(26,26,46,0.40)", fontWeight: 500 }}>Loading Portal...</div>
        </div>
      </div>
    );
  }

  // No user and not guest — show login screen
  if (!auth.user && !isGuest) {
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
        onBack={() => setIsGuest(true)}
      />
    );
  }

  // Guest or authenticated — show portal dashboard
  const guestMode = !auth.user && isGuest;
  return (
    <>
      <Dashboard
        user={auth.user}
        guestMode={guestMode}
        onSignOut={auth.user ? auth.signOut : null}
        onSignIn={() => setIsGuest(false)}
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

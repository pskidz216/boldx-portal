import { useState } from "react";
import { B, font } from "../theme";
import BXELogo from "./BXELogo";

export default function AuthScreen({
  onLogin,
  onForgotPassword,
  onGoogleSignIn,
  authError,
  authMessage,
  setAuthError,
  setAuthMessage,
}) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const clearMessages = () => { setAuthError(""); setAuthMessage(""); };

  const handleLogin = async () => {
    clearMessages();
    if (!email.includes("@")) { setAuthError("Enter a valid email"); return; }
    if (!password) { setAuthError("Enter your password"); return; }
    setLocalLoading(true);
    await onLogin(email, password);
    setLocalLoading(false);
  };

  const handleSignup = async () => {
    clearMessages();
    if (!firstName.trim() || !lastName.trim()) { setAuthError("First and last name required"); return; }
    if (!email.includes("@")) { setAuthError("Enter a valid email"); return; }
    if (password.length < 6) { setAuthError("Password must be at least 6 characters"); return; }
    if (password !== confirmPw) { setAuthError("Passwords don't match"); return; }
    setLocalLoading(true);
    await onLogin(email, password, firstName, lastName, true);
    setLocalLoading(false);
  };

  const handleForgot = async () => {
    clearMessages();
    if (!email.includes("@")) { setAuthError("Enter your email address first"); return; }
    setLocalLoading(true);
    await onForgotPassword(email);
    setLocalLoading(false);
  };

  const switchMode = (m) => { setMode(m); clearMessages(); };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    if (mode === "login") handleLogin();
    else if (mode === "signup") handleSignup();
    else handleForgot();
  };

  const inputStyle = {
    width: "100%", boxSizing: "border-box", padding: "12px 16px", borderRadius: B.radius,
    border: `1px solid ${B.borderDark}`, fontSize: 14, outline: "none",
    background: "rgba(255,255,255,0.6)", backdropFilter: B.blurSm, WebkitBackdropFilter: B.blurSm,
    color: B.text, transition: "border-color 0.2s", fontFamily: font,
  };
  const labelStyle = {
    fontSize: 11, fontWeight: 600, color: B.textSecondary, marginBottom: 5,
    display: "block", textTransform: "uppercase", letterSpacing: "0.05em",
  };
  const tabBtn = (active) => ({
    flex: 1, padding: "10px 0", borderRadius: B.radiusSm, border: "none", cursor: "pointer",
    fontSize: 13, fontWeight: 600, transition: "all 0.2s", fontFamily: font,
    background: active ? "#fff" : "transparent",
    color: active ? B.orange : B.textSecondary,
    boxShadow: active ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
  });

  return (
    <div style={{
      minHeight: "100vh", background: B.bg, display: "flex",
      alignItems: "center", justifyContent: "center", fontFamily: font,
    }}>
      {/* Floating glass orbs for background depth */}
      <div style={{
        position: "fixed", top: -120, right: -80, width: 400, height: 400,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(232,135,30,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", bottom: -100, left: -60, width: 350, height: 350,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        width: "100%", maxWidth: 420, margin: "0 16px", padding: "clamp(24px, 5vw, 40px)",
        background: B.glassStrong, backdropFilter: B.blurLg, WebkitBackdropFilter: B.blurLg,
        borderRadius: B.radiusXl, boxShadow: B.shadowXl,
        border: `1px solid ${B.glassBorder}`, boxSizing: "border-box",
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <BXELogo size={44} />
          <div style={{
            marginTop: 10, fontSize: 11, fontWeight: 700, color: B.textSecondary,
            textTransform: "uppercase", letterSpacing: "0.16em",
          }}>Enterprise Portal</div>
        </div>

        {mode !== "forgot" && (
          <div style={{ display: "flex", background: "rgba(0,0,0,0.04)", borderRadius: B.radius, padding: 3, marginBottom: 24 }}>
            <button onClick={() => switchMode("login")} style={tabBtn(mode === "login")}>Sign In</button>
            <button onClick={() => switchMode("signup")} style={tabBtn(mode === "signup")}>Create Account</button>
          </div>
        )}

        {mode === "forgot" && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: B.text, marginBottom: 4 }}>Reset Password</div>
            <div style={{ fontSize: 12, color: B.textSecondary }}>Enter your email and we'll send a reset link.</div>
          </div>
        )}

        {mode === "signup" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><label style={labelStyle}>First Name</label><input style={inputStyle} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First" onKeyDown={handleKeyDown} /></div>
            <div><label style={labelStyle}>Last Name</label><input style={inputStyle} value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last" onKeyDown={handleKeyDown} /></div>
          </div>
        )}

        <div style={{ marginBottom: 12 }}>
          <label style={labelStyle}>Email</label>
          <input style={inputStyle} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@boldxenterprises.com" onKeyDown={handleKeyDown} />
        </div>

        {mode !== "forgot" && (
          <div style={{ marginBottom: mode === "signup" ? 12 : 8 }}>
            <label style={labelStyle}>Password</label>
            <input style={inputStyle} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" onKeyDown={handleKeyDown} />
          </div>
        )}

        {mode === "signup" && (
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Confirm Password</label>
            <input style={inputStyle} type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} placeholder="Confirm password" onKeyDown={handleKeyDown} />
          </div>
        )}

        {mode === "login" && (
          <div style={{ textAlign: "right", marginBottom: 16 }}>
            <button onClick={() => switchMode("forgot")} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 12, color: B.orange, fontWeight: 500, fontFamily: font, padding: 0,
            }}>Forgot password?</button>
          </div>
        )}

        {authError && (
          <div style={{
            padding: "10px 14px", background: B.redSoft, borderRadius: B.radiusSm,
            fontSize: 13, color: B.red, marginBottom: 16, border: "1px solid rgba(239,68,68,0.15)",
          }}>{authError}</div>
        )}
        {authMessage && (
          <div style={{
            padding: "10px 14px", background: B.greenSoft, borderRadius: B.radiusSm,
            fontSize: 13, color: B.green, marginBottom: 16, border: "1px solid rgba(22,163,74,0.15)",
          }}>{authMessage}</div>
        )}

        <button
          onClick={mode === "login" ? handleLogin : mode === "signup" ? handleSignup : handleForgot}
          disabled={localLoading}
          style={{
            width: "100%", padding: "13px 0", borderRadius: B.radius, border: "none",
            cursor: localLoading ? "wait" : "pointer", fontSize: 14, fontWeight: 700,
            color: "#fff", fontFamily: font,
            background: localLoading ? "rgba(232,135,30,0.5)" : `linear-gradient(135deg, ${B.orange}, ${B.orangeLight})`,
            boxShadow: localLoading ? "none" : `0 4px 14px ${B.orangeGlow}`,
            transition: "all 0.2s", opacity: localLoading ? 0.7 : 1,
          }}>
          {localLoading
            ? (mode === "login" ? "Signing In..." : mode === "signup" ? "Creating Account..." : "Sending...")
            : (mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link")}
        </button>

        {mode !== "forgot" && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "18px 0" }}>
              <div style={{ flex: 1, height: 1, background: B.borderDark }} />
              <span style={{ fontSize: 11, fontWeight: 500, color: B.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em" }}>or</span>
              <div style={{ flex: 1, height: 1, background: B.borderDark }} />
            </div>
            <button onClick={onGoogleSignIn} style={{
              width: "100%", padding: "12px 0", borderRadius: B.radius,
              border: "1px solid rgba(0,0,0,0.10)", cursor: "pointer",
              fontSize: 14, fontWeight: 600, color: B.text, background: "#fff",
              transition: "all 0.2s", display: "flex", alignItems: "center",
              justifyContent: "center", gap: 10, fontFamily: font, boxShadow: B.shadow,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {mode === "login" ? "Sign in with Google" : "Sign up with Google"}
            </button>
          </>
        )}

        {mode === "forgot" && (
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <button onClick={() => switchMode("login")} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 13, color: B.orange, fontWeight: 500, fontFamily: font,
            }}>← Back to Sign In</button>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 12, fontSize: 10, color: B.textMuted }}>
          Restricted to @thearcstudio.com & @boldxenterprises.com
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../admin.module.css";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("ROCKSPACEHN1@GMAIL.COM");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    const response = await fetch("/api/admin/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    const data = await response.json();
    if (!response.ok) { setError(data.error || "No fue posible ingresar."); setBusy(false); return; }
    router.replace("/admin"); router.refresh();
  }

  return <div className={styles.loginPage}>
    <section className={styles.loginCard}>
      <Image src="/brand/rock-space-honduras.png" alt="Rock Space Honduras" width={96} height={96} priority />
      <span>ROCK SPACE HONDURAS</span>
      <h1>Panel privado</h1>
      <p>Acceso exclusivo para la cuenta administradora autorizada.</p>
      <form onSubmit={submit}>
        <label>Correo electrónico<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="username" required /></label>
        <label>Clave privada<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /></label>
        {error && <div className={styles.error}>{error}</div>}
        <button disabled={busy}>{busy ? "Verificando…" : "Entrar al panel"}</button>
      </form>
      <a href="/">← Volver al sitio</a>
    </section>
  </div>;
}

"use client";

import { useState, type FormEvent } from "react";
import { FIELD, LABEL, SubmitButton } from "./forms";

/**
 * Die Anmeldung für Mitglieder – die Tür, hinter der später der
 * Mitgliederbereich liegt.
 *
 * ── Stand ──────────────────────────────────────────────────────────────────
 * Der Bereich selbst ist noch nicht gebaut. Das Formular steht aber bereits
 * so da, wie es später gebraucht wird: Felder, Beschriftungen, Autocomplete
 * (damit Passwortmanager es erkennen). Nur handleSubmit zeigt vorerst einen
 * Hinweis statt anzumelden.
 *
 * Sobald das Login steht, schickt handleSubmit an die Anmelde-Route – am
 * Aufbau der Seite ändert sich nichts.
 *
 * Die IDs sind mit „login-“ vorangestellt, weil auf /mitglieder noch das
 * Bewerbungsformular steht und „email“ sonst zweimal vorkäme.
 */
export default function LoginForm() {
  const [notice, setNotice] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="login-email" className={LABEL}>
          E-Mail
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          required
          autoComplete="username"
          maxLength={200}
          className={`${FIELD} mt-2`}
        />
      </div>

      <div>
        <label htmlFor="login-password" className={LABEL}>
          Passwort
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={`${FIELD} mt-2`}
        />
      </div>

      {notice ? (
        <p
          role="status"
          className="border border-accent/40 px-4 py-3 text-sm leading-relaxed text-muted"
        >
          Der Mitgliederbereich ist noch im Aufbau. Sobald er steht, bekommst
          du deine Zugangsdaten von uns – du musst nichts weiter tun.
        </p>
      ) : null}

      <SubmitButton>Anmelden</SubmitButton>
    </form>
  );
}

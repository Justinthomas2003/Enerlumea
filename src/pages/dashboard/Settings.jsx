import { useOutletContext } from "react-router-dom";
import { Card } from "@enerlumea/ui";

export default function Settings() {
  const { theme, setTheme } = useOutletContext();

  return (
    <section className="settings-page">
      <div className="settings-heading">
        <h1>Settings</h1>
        <p>Customize how the dashboard appears in this browser.</p>
      </div>

      <Card
        as="section"
        className="settings-card"
        aria-labelledby="appearance-heading"
      >
        <div>
          <h2 id="appearance-heading">Appearance</h2>
          <p>Your theme preference is saved on this device.</p>
        </div>

        <div className="period-filter" role="group" aria-label="Color theme">
          <button
            type="button"
            className={theme === "light" ? "active" : ""}
            aria-pressed={theme === "light"}
            onClick={() => setTheme("light")}
          >
            Light
          </button>
          <button
            type="button"
            className={theme === "dark" ? "active" : ""}
            aria-pressed={theme === "dark"}
            onClick={() => setTheme("dark")}
          >
            Dark
          </button>
        </div>
      </Card>
    </section>
  );
}

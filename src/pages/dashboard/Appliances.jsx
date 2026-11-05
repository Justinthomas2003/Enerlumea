import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Plug,
  Zap,
  Activity,
} from "lucide-react";
import ApiStatus from "../../components/common/ApiStatus";
import useApiCollection from "../../hooks/useApiCollection";
import useDialogFocus from "../../hooks/useDialogFocus";
import {
  createAppliance,
  deleteAppliance as removeAppliance,
  listAppliances,
  updateAppliance,
} from "../../api/enerlumeaApi";

const emptyForm = {
  name: "",
  category: "Other",
  power: "",
  hoursPerDay: "",
  status: "Active",
};

function calculateDailyConsumption(power, hours) {
  return (Number(power) * Number(hours)) / 1000;
}

export default function Appliances() {
  const {
    items: appliances,
    isLoading,
    error: loadError,
    setError: setLoadError,
    reload,
  } = useApiCollection(listAppliances);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const dialogRef = useDialogFocus(showForm, () => setShowForm(false));

  const filteredAppliances = useMemo(() => {
    return appliances.filter((appliance) => {
      const matchesSearch =
        appliance.name.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || appliance.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        appliance.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [appliances, search, statusFilter, categoryFilter]);

  const totalDailyConsumption = appliances.reduce((total, appliance) => {
    if (appliance.status !== "Active") return total;

    return (
      total +
      calculateDailyConsumption(
        appliance.power,
        appliance.hoursPerDay
      )
    );
  }, 0);

  const activeCount = appliances.filter(
    (appliance) => appliance.status === "Active"
  ).length;

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  }

  function openEditForm(appliance) {
    setEditingId(appliance.id);
    setForm({
      name: appliance.name,
      category: appliance.category,
      power: String(appliance.power),
      hoursPerDay: String(appliance.hoursPerDay),
      status: appliance.status,
    });
    setError("");
    setShowForm(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const power = Number(form.power);
    const hours = Number(form.hoursPerDay);

    if (!form.name.trim()) {
      setError("Please enter an appliance name.");
      return;
    }

    if (!Number.isFinite(power) || power <= 0) {
      setError("Power must be a number greater than zero.");
      return;
    }

    if (!Number.isFinite(hours) || hours <= 0 || hours > 24) {
      setError("Daily usage must be between 0 and 24 hours.");
      return;
    }

    const applianceData = {
      ...form,
      name: form.name.trim(),
      power,
      hoursPerDay: hours,
    };

    try {
      if (editingId !== null) {
        await updateAppliance(editingId, applianceData);
      } else {
        await createAppliance(applianceData);
      }

      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
      setError("");
      await reload();
    } catch (saveError) {
      setError(saveError.message || "Could not save the appliance.");
    }
  }

  async function handleDeleteAppliance(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appliance?"
    );

    if (confirmed) {
      try {
        await removeAppliance(id);
        await reload();
      } catch (deleteError) {
        setLoadError(deleteError.message || "Could not delete the appliance.");
      }
    }
  }

  const categories = [
    "Cooling",
    "Kitchen",
    "Laundry",
    "Lighting",
    "Entertainment",
    "Other",
  ];

  return (
    <section className="appliances-page">
      <div className="page-header">
        <div>
          <h1>Appliance Management</h1>
          <p>Manage your appliances and monitor estimated energy usage.</p>
        </div>

        <button className="primary-button" onClick={openAddForm}>
          <Plus size={18} />
          Add Appliance
        </button>
      </div>

      <ApiStatus
        loading={isLoading}
        error={loadError}
        onRetry={reload}
        resource="appliances"
      />

      <div className="appliance-summary">
        <article className="appliance-summary-card">
          <Plug />
          <div>
            <span>Total Appliances</span>
            <h2>{appliances.length}</h2>
          </div>
        </article>

        <article className="appliance-summary-card">
          <Activity />
          <div>
            <span>Active Appliances</span>
            <h2>{activeCount}</h2>
          </div>
        </article>

        <article className="appliance-summary-card">
          <Zap />
          <div>
            <span>Estimated Daily Usage</span>
            <h2>{totalDailyConsumption.toFixed(2)} kWh</h2>
          </div>
        </article>
      </div>

      <div className="appliance-toolbar">
        <label className="appliance-search">
          <Search size={18} />
          <input
            type="search"
            aria-label="Search appliances"
            placeholder="Search appliances..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          aria-label="Filter by category"
        >
          <option value="All">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter by status"
        >
          <option value="All">All statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="appliance-list">
        {filteredAppliances.length === 0 ? (
          <p className="empty-state">No matching appliances found.</p>
        ) : (
          filteredAppliances.map((appliance) => {
            const dailyUsage = calculateDailyConsumption(
              appliance.power,
              appliance.hoursPerDay
            );

            return (
              <article className="appliance-card" key={appliance.id}>
                <div className="appliance-icon">
                  <Plug size={22} />
                </div>

                <div className="appliance-details">
                  <h3>{appliance.name}</h3>
                  <p>{appliance.category}</p>
                </div>

                <div className="appliance-stat">
                  <span>Power</span>
                  <strong>{appliance.power} W</strong>
                </div>

                <div className="appliance-stat">
                  <span>Daily usage</span>
                  <strong>{appliance.hoursPerDay} hours</strong>
                </div>

                <div className="appliance-stat">
                  <span>Estimated energy</span>
                  <strong>{dailyUsage.toFixed(2)} kWh/day</strong>
                </div>

                <span
                  className={`appliance-status ${
                    appliance.status.toLowerCase()
                  }`}
                >
                  {appliance.status}
                </span>

                <div className="appliance-actions">
                  <button
                    type="button"
                    onClick={() => openEditForm(appliance)}
                    aria-label={`Edit ${appliance.name}`}
                    title="Edit appliance"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteAppliance(appliance.id)}
                    aria-label={`Delete ${appliance.name}`}
                    title="Delete appliance"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>

      {showForm && (
        <div className="appliance-modal-backdrop">
          <form
            ref={dialogRef}
            className="appliance-form"
            role="dialog"
            aria-modal="true"
            aria-labelledby="appliance-form-title"
            onSubmit={handleSubmit}
          >
            <div className="form-header">
              <h2 id="appliance-form-title">
                {editingId !== null ? "Edit Appliance" : "Add Appliance"}
              </h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                aria-label="Close form"
              >
                <X />
              </button>
            </div>

            <label>
              Appliance name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Air Conditioner"
                maxLength={120}
                required
              />
            </label>

            <label>
              Category
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Power rating (Watts)
              <input
                name="power"
                type="number"
                min="1"
                max="999999999.999"
                step="any"
                value={form.power}
                onChange={handleChange}
                placeholder="e.g. 1000"
                required
              />
            </label>

            <label>
              Daily usage (Hours)
              <input
                name="hoursPerDay"
                type="number"
                min="0.01"
                max="24"
                step="any"
                value={form.hoursPerDay}
                onChange={handleChange}
                placeholder="e.g. 5"
                required
              />
            </label>

            <label>
              Status
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>

            {error && <p className="form-error" role="alert">{error}</p>}

            <button className="primary-button" type="submit">
              {editingId !== null ? "Save Changes" : "Add Appliance"}
            </button>
          </form>
        </div>
      )}

      <p className="demo-disclaimer">
        Demo data: energy consumption values are estimates based on appliance
        power ratings and daily usage. Actual consumption may vary.
      </p>
    </section>
  );
}

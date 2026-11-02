import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Zap,
  Sun,
  Activity,
} from "lucide-react";
import { initialEnergyRecords } from "../../data/energyRecords";

const emptyForm = {
  name: "",
  type: "Consumption",
  date: "",
  energy: "",
  notes: "",
};

export default function EnergyRecords() {
  const [records, setRecords] = useState(initialEnergyRecords);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesSearch =
        record.name.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        typeFilter === "All" || record.type === typeFilter;

      const matchesDate =
        !dateFilter || record.date === dateFilter;

      return matchesSearch && matchesType && matchesDate;
    });
  }, [records, search, typeFilter, dateFilter]);

  const totalConsumption = records
    .filter((record) => record.type === "Consumption")
    .reduce((sum, record) => sum + Number(record.energy), 0);

  const totalGeneration = records
    .filter((record) => record.type === "Generation")
    .reduce((sum, record) => sum + Number(record.energy), 0);

  const netEnergy = totalGeneration - totalConsumption;

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  }

  function openEditForm(record) {
    setEditingId(record.id);
    setForm({
      name: record.name,
      type: record.type,
      date: record.date,
      energy: String(record.energy),
      notes: record.notes,
    });
    setError("");
    setShowForm(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const energy = Number(form.energy);

    if (!form.name.trim()) {
      setError("Please enter a record name.");
      return;
    }

    if (!form.date) {
      setError("Please select a date.");
      return;
    }

    if (!Number.isFinite(energy) || energy <= 0) {
      setError("Energy must be a number greater than zero.");
      return;
    }

    const recordData = {
      ...form,
      name: form.name.trim(),
      energy,
      notes: form.notes.trim(),
    };

    if (editingId !== null) {
      setRecords((previous) =>
        previous.map((record) =>
          record.id === editingId
            ? { ...record, ...recordData }
            : record
        )
      );
    } else {
      setRecords((previous) => [
        ...previous,
        { id: Date.now(), ...recordData },
      ]);
    }

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  }

  function deleteRecord(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this energy record?"
    );

    if (confirmed) {
      setRecords((previous) =>
        previous.filter((record) => record.id !== id)
      );
    }
  }

  return (
    <section className="energy-records-page">
      <div className="page-header">
        <div>
          <h1>Energy Records</h1>
          <p>Track and manage your energy consumption and generation.</p>
        </div>

        <button className="primary-button" onClick={openAddForm}>
          <Plus size={18} />
          Add Record
        </button>
      </div>

      <div className="energy-record-summary">
        <article className="energy-record-summary-card">
          <Zap />
          <div>
            <span>Total Consumption</span>
            <h2>{totalConsumption.toFixed(2)} kWh</h2>
          </div>
        </article>

        <article className="energy-record-summary-card">
          <Sun />
          <div>
            <span>Total Generation</span>
            <h2>{totalGeneration.toFixed(2)} kWh</h2>
          </div>
        </article>

        <article className="energy-record-summary-card">
          <Activity />
          <div>
            <span>Net Energy</span>
            <h2>{netEnergy.toFixed(2)} kWh</h2>
          </div>
        </article>
      </div>

      <div className="energy-record-toolbar">
        <label className="energy-record-search">
          <Search size={18} />
          <input
            type="search"
            placeholder="Search records..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <select
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
          aria-label="Filter by record type"
        >
          <option value="All">All types</option>
          <option value="Consumption">Consumption</option>
          <option value="Generation">Generation</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(event) => setDateFilter(event.target.value)}
          aria-label="Filter by date"
        />
      </div>

      <div className="energy-record-table-wrapper">
        <table className="energy-record-table">
          <thead>
            <tr>
              <th>Record</th>
              <th>Type</th>
              <th>Date</th>
              <th>Energy</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-state">
                  No matching energy records found.
                </td>
              </tr>
            ) : (
              filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.name}</td>

                  <td>
                    <span
                      className={`energy-type ${record.type.toLowerCase()}`}
                    >
                      {record.type}
                    </span>
                  </td>

                  <td>{record.date}</td>
                  <td>{record.energy.toFixed(2)} kWh</td>
                  <td>{record.notes || "—"}</td>

                  <td>
                    <div className="energy-record-actions">
                      <button
                        type="button"
                        onClick={() => openEditForm(record)}
                        aria-label={`Edit ${record.name}`}
                        title="Edit record"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteRecord(record.id)}
                        aria-label={`Delete ${record.name}`}
                        title="Delete record"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="appliance-modal-backdrop">
          <form className="appliance-form" onSubmit={handleSubmit}>
            <div className="form-header">
              <h2>
                {editingId !== null ? "Edit Energy Record" : "Add Energy Record"}
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
              Record name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Household Consumption"
                required
              />
            </label>

            <label>
              Record type
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <option value="Consumption">Consumption</option>
                <option value="Generation">Generation</option>
              </select>
            </label>

            <label>
              Date
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Energy (kWh)
              <input
                type="number"
                name="energy"
                min="0.01"
                step="any"
                value={form.energy}
                onChange={handleChange}
                placeholder="e.g. 12.5"
                required
              />
            </label>

            <label>
              Notes (optional)
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Additional information..."
                rows="3"
              />
            </label>

            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            <button className="primary-button" type="submit">
              {editingId !== null ? "Save Changes" : "Add Record"}
            </button>
          </form>
        </div>
      )}

      <p className="demo-disclaimer">
        Demo data: these energy records are illustrative examples, not actual
        smart-meter readings.
      </p>
    </section>
  );
}

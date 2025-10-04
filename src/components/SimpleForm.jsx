import React, { useMemo, useRef, useState } from "react";

const STATES = {
  MA: ["Boston", "Cambridge", "Worcester", "Springfield"],
  FL: ["Miami", "Tampa", "Orlando", "Jacksonville"],
  CA: ["San Francisco", "Los Angeles", "San Diego", "Sacramento"],
};

export default function SimpleForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bio: "",
    state: "MA",
    city: "",
    role: "qa",
    newsletter: false,
    agree: false,
    rating: 3,
    color: "#4f46e5",
    date: "",
    time: "",
  });
  const [rows, setRows] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const fileRef = useRef(null);

  const cities = useMemo(() => STATES[form.state] ?? [], [form.state]);

  const setField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    const e = {};
    if (!form.firstName) e.firstName = "First name is required";
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/))
      e.email = "Valid email is required";
    if (form.password.length < 6) e.password = "Password must be 6+ chars";
    if (!form.agree) e.agree = "You must agree to continue";
    if (!form.city) e.city = "Pick a city";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const fileName = fileRef.current?.files?.[0]?.name || null;
    const payload = { ...form, fileName };
    setRows((r) => [...r, payload]);
    setSubmitted(true);
  };

  const onReset = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      bio: "",
      state: "MA",
      city: "",
      role: "qa",
      newsletter: false,
      agree: false,
      rating: 3,
      color: "#4f46e5",
      date: "",
      time: "",
    });
    setErrors({});
    if (fileRef.current) fileRef.current.value = "";
    setSubmitted(false);
  };

  return (
    <div className="row g-4" data-testid="page-root">
      <div className="col-12 col-lg-6">
        <div className="card shadow-sm" data-testid="card-form">
          <div className="card-body">
            <h2 className="h5 mb-3">Registration Form</h2>
            <form onSubmit={onSubmit} onReset={onReset} data-testid="form">
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    id="firstName"
                    className={`form-control ${
                      errors.firstName ? "is-invalid" : ""
                    }`}
                    value={form.firstName}
                    onChange={(e) => setField("firstName", e.target.value)}
                    placeholder="Jane"
                    data-testid="input-firstName"
                  />
                  {errors.firstName && (
                    <div
                      className="invalid-feedback"
                      data-testid="error-firstName"
                    >
                      {errors.firstName}
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    className="form-control"
                    value={form.lastName}
                    onChange={(e) => setField("lastName", e.target.value)}
                    placeholder="Doe"
                    data-testid="input-lastName"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    placeholder="jane@example.com"
                    data-testid="input-email"
                  />
                  {errors.email && (
                    <div className="invalid-feedback" data-testid="error-email">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    value={form.password}
                    onChange={(e) => setField("password", e.target.value)}
                    placeholder="••••••"
                    data-testid="input-password"
                  />
                  {errors.password && (
                    <div
                      className="invalid-feedback"
                      data-testid="error-password"
                    >
                      {errors.password}
                    </div>
                  )}
                </div>

                <div className="col-12">
                  <label htmlFor="bio" className="form-label">
                    Short bio
                  </label>
                  <textarea
                    id="bio"
                    className="form-control"
                    rows="3"
                    value={form.bio}
                    onChange={(e) => setField("bio", e.target.value)}
                    placeholder="Tell us something..."
                    data-testid="textarea-bio"
                  ></textarea>
                </div>

                <div className="col-md-6">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <select
                    id="state"
                    className="form-select"
                    value={form.state}
                    onChange={(e) => setField("state", e.target.value)}
                    data-testid="select-state"
                  >
                    {Object.keys(STATES).map((s) => (
                      <option value={s} key={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <select
                    id="city"
                    className={`form-select ${errors.city ? "is-invalid" : ""}`}
                    value={form.city}
                    onChange={(e) => setField("city", e.target.value)}
                    data-testid="select-city"
                  >
                    <option value="">Select a city…</option>
                    {cities.map((c) => (
                      <option value={c} key={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <div className="invalid-feedback" data-testid="error-city">
                      {errors.city}
                    </div>
                  )}
                </div>

                <div className="col-12">
                  <label className="form-label d-block">Role</label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="role-qa"
                      value="qa"
                      checked={form.role === "qa"}
                      onChange={(e) => setField("role", e.target.value)}
                      data-testid="radio-role-qa"
                    />
                    <label className="form-check-label" htmlFor="role-qa">
                      QA
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="role-dev"
                      value="dev"
                      checked={form.role === "dev"}
                      onChange={(e) => setField("role", e.target.value)}
                      data-testid="radio-role-dev"
                    />
                    <label className="form-check-label" htmlFor="role-dev">
                      Developer
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="role-pm"
                      value="pm"
                      checked={form.role === "pm"}
                      onChange={(e) => setField("role", e.target.value)}
                      data-testid="radio-role-pm"
                    />
                    <label className="form-check-label" htmlFor="role-pm">
                      PM
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    className="form-control"
                    value={form.date}
                    onChange={(e) => setField("date", e.target.value)}
                    data-testid="input-date"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="time" className="form-label">
                    Time
                  </label>
                  <input
                    id="time"
                    type="time"
                    className="form-control"
                    value={form.time}
                    onChange={(e) => setField("time", e.target.value)}
                    data-testid="input-time"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="color" className="form-label">
                    Favorite color
                  </label>
                  <input
                    id="color"
                    type="color"
                    className="form-control form-control-color"
                    value={form.color}
                    onChange={(e) => setField("color", e.target.value)}
                    title="Choose your color"
                    data-testid="input-color"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="rating" className="form-label">
                    Satisfaction ({form.rating})
                  </label>
                  <input
                    id="rating"
                    type="range"
                    className="form-range"
                    min="1"
                    max="5"
                    value={form.rating}
                    onChange={(e) => setField("rating", Number(e.target.value))}
                    data-testid="input-range"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="file" className="form-label">
                    Profile picture
                  </label>
                  <input
                    id="file"
                    ref={fileRef}
                    type="file"
                    className="form-control"
                    data-testid="input-file"
                  />
                </div>

                <div className="col-md-6 d-flex align-items-end gap-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="newsletter"
                      checked={form.newsletter}
                      onChange={(e) => setField("newsletter", e.target.checked)}
                      data-testid="switch-newsletter"
                    />
                    <label className="form-check-label" htmlFor="newsletter">
                      Subscribe
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className={`form-check-input ${
                        errors.agree ? "is-invalid" : ""
                      }`}
                      type="checkbox"
                      id="agree"
                      checked={form.agree}
                      onChange={(e) => setField("agree", e.target.checked)}
                      data-testid="checkbox-agree"
                    />
                    <label className="form-check-label" htmlFor="agree">
                      I agree to terms
                    </label>
                    {errors.agree && (
                      <div
                        className="invalid-feedback d-block"
                        data-testid="error-agree"
                      >
                        {errors.agree}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-12 d-flex gap-2">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    data-testid="btn-submit"
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    type="reset"
                    data-testid="btn-reset"
                  >
                    Reset
                  </button>
                  <button
                    className="btn btn-outline-info ms-auto"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#helpModal"
                    data-testid="btn-open-modal"
                  >
                    Open Help Modal
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-6">
        <div className="card shadow-sm" data-testid="card-table">
          <div className="card-body">
            <div className="d-flex align-items-center mb-2">
              <h2 className="h5 mb-0">Submissions</h2>
              {submitted && (
                <span
                  className="badge text-bg-success ms-2"
                  data-testid="badge-submitted"
                >
                  Last action: Submitted
                </span>
              )}
            </div>
            <div className="table-responsive">
              <table
                className="table table-striped align-middle"
                data-testid="table"
              >
                <thead>
                  <tr>
                    <th>First</th>
                    <th>Last</th>
                    <th>Email</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Role</th>
                    <th>Rating</th>
                    <th>File</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center text-muted"
                        data-testid="empty"
                      >
                        No submissions yet
                      </td>
                    </tr>
                  ) : (
                    rows.map((r, i) => (
                      <tr key={i} data-testid={`row-${i}`}>
                        <td>{r.firstName}</td>
                        <td>{r.lastName}</td>
                        <td>{r.email}</td>
                        <td>{r.state}</td>
                        <td>{r.city}</td>
                        <td>{r.role.toUpperCase()}</td>
                        <td>{r.rating}</td>
                        <td>{r.fileName || "—"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      <div
        className="modal fade"
        id="helpModal"
        tabIndex="-1"
        aria-hidden="true"
        data-testid="modal"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Testing Tips</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                data-testid="btn-close-modal"
              ></button>
            </div>
            <div className="modal-body">
              <ul className="mb-0">
                <li>
                  Use <code>getByTestId</code> with the provided{" "}
                  <code>data-testid</code> attributes.
                </li>
                <li>
                  Practice waiting for form validation and table row updates.
                </li>
                <li>Target modal open/close and assert focus trapping.</li>
              </ul>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

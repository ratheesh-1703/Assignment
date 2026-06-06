import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { useAuth } from '../context/AuthContext';

const initialState = {
  fullName: '',
  phoneNumber: '',
  email: '',
  password: '',
  companyName: '',
  agency: 'Yes',
};

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signup(form);
    navigate('/profile');
  };

  return (
    <main className="screen">
      <section className="screen__content screen__content--signup">
        <header className="page-header page-header--signup">
          <h1 className="page-title page-title--signup">
            Create your
            <br />
            PopX account
          </h1>
        </header>

        <form className="form" onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Marry Doe"
            autoComplete="name"
            required
          />
          <InputField
            label="Phone number"
            name="phoneNumber"
            type="tel"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Marry Doe"
            autoComplete="tel"
            required
          />
          <InputField
            label="Email address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Marry Doe"
            autoComplete="email"
            required
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Marry Doe"
            autoComplete="new-password"
            required
          />
          <InputField
            label="Company name"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            placeholder="Marry Doe"
            autoComplete="organization"
          />

          <div className="radio-group">
            <span className="radio-group__label">
              Are you an Agency? <span aria-hidden="true">*</span>
            </span>

            <div className="radio-row">
              <label className="radio-option">
                <input type="radio" name="agency" value="Yes" checked={form.agency === 'Yes'} onChange={handleChange} />
                <span className="radio-control" />
                <span>Yes</span>
              </label>
              <label className="radio-option">
                <input type="radio" name="agency" value="No" checked={form.agency === 'No'} onChange={handleChange} />
                <span className="radio-control" />
                <span>No</span>
              </label>
            </div>
          </div>

          <div className="form__actions">
            <Button type="submit" fullWidth>
              Create Account
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
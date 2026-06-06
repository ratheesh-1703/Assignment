import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { useAuth } from '../context/AuthContext';

const initialState = {
  email: '',
  password: '',
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(form.email, form.password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setError('');
    navigate('/profile');
  };

  return (
    <main className="screen">
      <section className="screen__content screen__content--no-top">
        <header className="page-header">
          <h1 className="page-title">
            Signin to your
            <br />
            PopX account
          </h1>
          <p className="subtitle">Lorem ipsum dolor sit amet, 
            <br />
            consectetur adipiscing elit.</p>
        </header>

        <form className="form" onSubmit={handleSubmit}>
          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email address"
            autoComplete="email"
            required
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            autoComplete="current-password"
            required
          />

          {error ? <p className="form__error">{error}</p> : null}

          <div className="form__actions form__actions--compact">
            <Button type="submit" fullWidth disabled={!form.email.trim() || !form.password.trim()}>
              Login
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
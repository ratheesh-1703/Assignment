import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <main className="screen">
      <section className="screen__content screen__content--landing">
        <div className="landing-copy">
          <p className="eyebrow">Welcome to PopX</p>
          <p className="subtitle">
            Lorem ipsum dolor sit amet,
            <br />
            consectetur adipiscing elit,
          </p>
        </div>

        <div className="stack stack--landing">
          <Button fullWidth onClick={() => navigate('/signup')}>
            Create Account
          </Button>
          <Button variant="secondary" fullWidth className="button--landing-login" onClick={() => navigate('/login')}>
            Already Registered? Login
          </Button>
        </div>
      </section>
    </main>
  );
}
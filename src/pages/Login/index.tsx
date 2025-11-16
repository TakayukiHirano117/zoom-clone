import { Link, Navigate } from 'react-router-dom';
import './Login.css';
import { useState } from 'react';
import { authRepository } from '../../modules/auth/auth.repository';
import { useAtom } from 'jotai';
import { currentUserAtom } from '../../modules/auth/current-user.state';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  if (currentUser) {
    return <Navigate to="/" />;
  }

  const signin = async () => {
    setIsLoading(true);
    if (!email || !password) {
      setIsLoading(false);
      return;
    }
    try {
      const { user, token } = await authRepository.signin(email, password);
      localStorage.setItem('token', token);
      setCurrentUser(user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          <h1>Zoom Clone</h1>
        </div>

        <div className="login-form">
          <div className="input-group">
            <input
              type="email"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="signin-button"
            onClick={signin}
            disabled={!email || !password}
          >
            {isLoading ? 'サインイン中...' : 'サインイン'}
          </button>
        </div>

        <div className="login-links">
          <Link to="/signup" className="signup-link">
            アカウント作成
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

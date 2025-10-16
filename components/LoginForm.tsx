// Implemented LoginForm component to fix module resolution errors.
import React, { useState } from 'react';
import { mockAuthService } from '../services/mockAuthService';
import { User } from '../types';

interface LoginFormProps {
  onLoginSuccess: (user: User) => void;
  onSwitchToSignup: () => void;
  onSwitchToForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, onSwitchToSignup, onSwitchToForgotPassword }) => {
  const [email, setEmail] = useState('sam@studio.co');
  const [password, setPassword] = useState('Password123');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setIsLoading(true);
    try {
      const user = await mockAuthService.login(email, password);
      onLoginSuccess(user);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-white mb-2">Welcome Back</h2>
      <p className="text-center text-gray-400 mb-8">Log in to access your production studio.</p>

      {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-300">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} className="mt-2 w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500" />
        </div>
        <div>
          <div className="flex justify-between items-center">
             <label className="text-sm font-medium text-gray-300">Password</label>
             <button type="button" onClick={onSwitchToForgotPassword} className="text-xs text-cyan-400 hover:text-cyan-300">Forgot Password?</button>
          </div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} className="mt-2 w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500" />
        </div>
        <button type="submit" disabled={isLoading} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center">
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging In...
                </>
            ) : 'Log In'}
        </button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-6">
        Don't have an account?{' '}
        <button onClick={onSwitchToSignup} className="font-semibold text-cyan-400 hover:text-cyan-300">
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginForm;

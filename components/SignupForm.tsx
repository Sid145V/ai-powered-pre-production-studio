import React, { useState } from 'react';
import { mockAuthService } from '../services/mockAuthService';
import { User } from '../types';

interface SignupFormProps {
  onSignupSuccess: (user: User) => void;
  onSwitchToLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignupSuccess, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
    }

    setIsLoading(true);
    try {
      const user = await mockAuthService.signup(name, email, password);
      onSignupSuccess(user);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-white mb-2">Create Account</h2>
      <p className="text-center text-gray-400 mb-8">Join the future of film production.</p>

      {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-300">Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} className="mt-2 w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} className="mt-2 w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500" />
        </div>
        <div>
           <label className="text-sm font-medium text-gray-300">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} className="mt-2 w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500" />
        </div>
        <button type="submit" disabled={isLoading} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center">
            {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="font-semibold text-cyan-400 hover:text-cyan-300">
          Log In
        </button>
      </p>
    </div>
  );
};

export default SignupForm;

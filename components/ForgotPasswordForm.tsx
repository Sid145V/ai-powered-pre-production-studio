// Implemented ForgotPasswordForm component to fix module resolution errors.
import React, { useState } from 'react';
import { mockAuthService } from '../services/mockAuthService';

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setIsLoading(true);
    try {
      await mockAuthService.requestPasswordReset(email);
      setSuccess(`If an account exists for ${email}, a password reset link has been sent.`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-white mb-2">Reset Password</h2>
      <p className="text-center text-gray-400 mb-8">Enter your email to receive a reset link.</p>
      
      {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4 text-sm">{error}</div>}
      {success && <div className="bg-green-500/20 border border-green-500 text-green-300 p-3 rounded-lg mb-4 text-sm">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-300">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading || !!success} className="mt-2 w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500" />
        </div>
        <button type="submit" disabled={isLoading || !!success} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-6">
        Remember your password?{' '}
        <button onClick={onSwitchToLogin} className="font-semibold text-cyan-400 hover:text-cyan-300">
          Back to Login
        </button>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;

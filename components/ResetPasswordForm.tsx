import React, { useState } from 'react';
import { mockAuthService } from '../services/mockAuthService';

interface ResetPasswordFormProps {
  token: string;
  onPasswordResetSuccess: () => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token, onPasswordResetSuccess }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!password || !confirmPassword) {
      setError('Please fill in both fields.');
      return;
    }
    if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
    }

    setIsLoading(true);
    try {
      await mockAuthService.resetPassword(token, password);
      setSuccess('Your password has been successfully reset.');
      setTimeout(onPasswordResetSuccess, 2000); // Redirect after 2 seconds
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-white mb-2">Set New Password</h2>
      <p className="text-center text-gray-400 mb-8">Choose a new, strong password for your account.</p>
      
      {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4 text-sm">{error}</div>}
      {success && <div className="bg-green-500/20 border border-green-500 text-green-300 p-3 rounded-lg mb-4 text-sm">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-300">New Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading || !!success} className="mt-2 w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500" />
        </div>
         <div>
          <label className="text-sm font-medium text-gray-300">Confirm New Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={isLoading || !!success} className="mt-2 w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500" />
        </div>
        <button type="submit" disabled={isLoading || !!success} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
          {isLoading ? 'Resetting...' : 'Set New Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;

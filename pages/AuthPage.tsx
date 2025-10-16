import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import { User } from '../types';

interface AuthPageProps {
  onLoginSuccess: (user: User) => void;
}

type AuthMode = 'login' | 'signup' | 'forgotPassword';

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('login');

  const renderForm = () => {
    switch (mode) {
      case 'login':
        return (
          <LoginForm
            onLoginSuccess={onLoginSuccess}
            onSwitchToSignup={() => setMode('signup')}
            onSwitchToForgotPassword={() => setMode('forgotPassword')}
          />
        );
      case 'signup':
        return (
          <SignupForm
            onSignupSuccess={onLoginSuccess}
            onSwitchToLogin={() => setMode('login')}
          />
        );
      case 'forgotPassword':
        return (
            <ForgotPasswordForm 
                onSwitchToLogin={() => setMode('login')}
            />
        );
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-md p-8 bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl">
        <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-amber-500 rounded-lg"></div>
            <h1 className="text-2xl font-bold tracking-wider text-white">CINE-AI</h1>
        </div>
        {renderForm()}
      </div>
    </div>
  );
};

export default AuthPage;

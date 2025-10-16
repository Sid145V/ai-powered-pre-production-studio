import { User } from '../types';

const FAKE_USERS: User[] = [
  { id: '1', name: 'Samira "Sam" Hadid', email: 'sam@studio.co', avatarUrl: 'https://i.pravatar.cc/150?u=sam@studio.co' },
];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAuthService = {
  login: async (email: string, password: string): Promise<User> => {
    await sleep(1000);
    const user = FAKE_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user && password === 'Password123') { // Simple password check for mock
      sessionStorage.setItem('authedUser', JSON.stringify(user));
      return user;
    }
    throw new Error('Invalid email or password.');
  },

  signup: async (name: string, email: string, password: string): Promise<User> => {
    await sleep(1500);
    if (FAKE_USERS.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('An account with this email already exists.');
    }
    const newUser: User = { id: String(FAKE_USERS.length + 1), name, email, avatarUrl: `https://i.pravatar.cc/150?u=${email}` };
    FAKE_USERS.push(newUser);
    sessionStorage.setItem('authedUser', JSON.stringify(newUser));
    return newUser;
  },
  
  logout: async (): Promise<void> => {
    await sleep(500);
    sessionStorage.removeItem('authedUser');
    return;
  },

  checkSession: (): User | null => {
      const userJson = sessionStorage.getItem('authedUser');
      return userJson ? JSON.parse(userJson) : null;
  },

  requestPasswordReset: async (email: string): Promise<void> => {
    await sleep(1200);
    console.log(`Password reset requested for ${email}. In a real app, an email would be sent.`);
    return;
  },

  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    await sleep(1000);
    if (token !== 'valid-reset-token') {
        throw new Error('Invalid or expired password reset token.');
    }
    console.log(`Password has been reset with new password: ${newPassword}`);
    return;
  },
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  // POST /api/auth/signup
  async signUp(userData) {
    await delay(500);
    // TODO: Replace with actual API call
    // const response = await fetch('/api/auth/signup', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userData)
    // });
    // return response.json();
    
    return {
      success: true,
      user: {
        id: 'user_123',
        email: userData.email,
        fullName: userData.fullName
      },
      token: 'mock_jwt_token_here'
    };
  },

  // POST /api/auth/login
  async login(credentials) {
    await delay(500);
    // TODO: Replace with actual API call
    
    return {
      success: true,
      user: {
        id: 'user_123',
        email: credentials.email,
        fullName: 'John Doe'
      },
      token: 'mock_jwt_token_here'
    };
  },

  // POST /api/auth/google
  async signUpWithGoogle() {
    await delay(500);
    // TODO: Implement Google OAuth flow
    return {
      success: true,
      user: {
        id: 'user_123',
        email: 'user@gmail.com',
        fullName: 'Google User'
      },
      token: 'mock_jwt_token_here'
    };
  },

  // POST /api/auth/logout
  async logout() {
    await delay(300);
    // TODO: Replace with actual API call
    return { success: true };
  }
};
export interface ISocialAuthService {
  load(appId: string): Promise<void>;
  isSignedIn(): Promise<boolean>;
  signIn(): Promise<boolean>;
  signOut(): Promise<boolean>;
  getProfile(): Promise<any>;
}

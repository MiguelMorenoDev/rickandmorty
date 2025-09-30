export interface VerifyTokenResponse {
  success: boolean;
  message: string;
  user?: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}
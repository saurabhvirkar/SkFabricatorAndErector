export interface Inquiry {
  name: string;
  email: string;
  phone?: string; // Optional field in C# model
  subject?: string; // New field from C# model
  category?: string; // New field from C# model
  preferredContact?: string; // New field from C# model
  message: string;
}
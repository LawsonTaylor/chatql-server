export interface User {
    id?: string;
    name: string;
    online: boolean;
  }
  
export interface Message {
    id: string;
    text: string;
    userId: string;
  }
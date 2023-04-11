export interface Plan {
  name: string;
  cpu: number;
  ram: number;
  disk: number;
}

export interface User {
  id: string;
  plan: Plan;
}

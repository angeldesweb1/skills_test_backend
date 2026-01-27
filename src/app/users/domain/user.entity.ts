export interface UserEntity {
  uuid: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string; // Parche temporal, se debe retirar de aquí
}

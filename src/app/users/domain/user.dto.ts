export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  uuid: string;
  email: string;
  password: string;
}

export interface CreateUserDto {
  uuid: string;
  email: string;
  password: string;
}

export type UpdateUserDto = Partial<CreateUserDto>;

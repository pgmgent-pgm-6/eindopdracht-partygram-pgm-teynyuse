export type UserMetaData = {
    first_name: string;
    last_name: string;
    avatar?: string | null;
  };

  export type UserProfile = {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    avatar?: string | null;
  }

  export type UserWithRelations = User & { profile: UserProfile };
  
  export type User = {
    id: string;
    email: string;
  } & UserMetaData;

  export type CreateUserBody = {
    email: string;
    password: string;
  } & UserMetaData;

  export type UpdateUserBody = CreateUserBody & {
    id: string;
  };
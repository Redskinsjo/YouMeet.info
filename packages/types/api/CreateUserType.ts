type CreateUserType = {
  firstname: string;
  lastname: string;
  fullname: string;
  languages: string[];
  picture: string;
  email: string;
  credit: number;
  auth?: {
    social: {
      accessToken: string | null;
      refreshToken: string | null;
      expiryDate: string | null;
    };
  };
  user: boolean;
  uniqueName: string;
  extension: string;
  professionalEmail: boolean;
};

export default CreateUserType;

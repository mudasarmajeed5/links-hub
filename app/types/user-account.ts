export type UserLink = {
  icon: string;
  label: string;
  link: string;
  _id: {
    $oid: string;
  };
};

export type User = {
  _id: {
    $oid: string;
  };
  password?:''
  email: string;
  username: string;
  profilePic?: string;
  spotifyUrl?:string;
  bio?: string;
  name: string;
  theme: number;
  isPremiumUser: boolean;
  userLinks: UserLink[];
  createdAt: string;
  updatedAt: string; 
  __v: number;
};

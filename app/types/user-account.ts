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
  email: string;
  username: string;
  profilePic?: string;
  name: string;
  theme: number;
  isPremiumUser: boolean;
  userLinks: UserLink[];
  createdAt: {
    $date: string;
  };
  updatedAt: {
    $date: string;
  };
  __v: number;
};

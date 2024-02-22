export interface TAuthRequest {
  access_token: string;
  refresh_token: string;
}

export interface TUserRequest {
  email: string;
  id: string;
  first_name: string;
  last_name: string;
  phone_number: null | string;
}

export interface TCategory {
  id: string;
  name: string;
}

export interface TGetProducts {
  title: string;
  description: string;
  image: string;
  price: number;
  salePrice: null;
  category_name: string;
  id: string;
}

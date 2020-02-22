export class Admin{
  id?: string;
  email: string;
  name: string;
  password: string;
  type: string;
}

export class Address{
  city?: string;
  country?: string;
  postal_code?: string;
  state?: string;
  street?: string;
}

export class Property{
  name: string;
  program: string[];
  address: Address;
}

export class Owner{
  id?: string;
  address?: Address;
  email: string;
  first_name?: string;
  last_name?: string;
  password: string;
  phone?: string;
  properties: Property[];
  type: string;
}

export class BirthAnniversary {
  date?: string;
  month?: string;
}

export class Customer{
  id?: string;
  address?: Address;
  age?: string;
  birth_anniversary?: BirthAnniversary;
  center?: string;
  center_owner_id?: string;
  email: string;
  first_name: string;
  gender?: string;
  last_name?: string;
  middle_name?: string;
  password: string;
  phone?: string;
  program: string;
  type: string;
}

export class Rating{
  id?: string;
  center?: string;
  comment?: string;
  date: string;
  owner_id: string;
  program: string;
  rating: number;
  user_id: string;
}

export class AuthorisedData {
  type: string;
  id: string;
}

export class AggregatedCenterRating {
  owner_id: string;
  center: string;
  rating: number;
}
export class AggregatedOwnerRating {
  owner_id: string;
  rating: number;
}

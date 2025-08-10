import { PageableDetails, SortDetails } from 'src/app/shared/models/pageable.interface';

export interface UserResponse {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
  location: string;
  role: string;
}

export interface PaginatedUserResponse {
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  numberOfElements: number;
  content: UserResponse[];
  sort: SortDetails[];
  first: boolean;
  last: boolean;
  pageable: PageableDetails;
  empty: boolean;
}

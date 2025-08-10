import { UserResponse } from 'src/app/core/services/auth/user-response.interface';
import { PageableDetails, SortDetails } from 'src/app/shared/models/pageable.interface';

export interface Comment {
  id: string;
  comment: string;
  user: UserResponse;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedCommentsResponse {
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  numberOfElements: number;
  content: Comment[];
  sort: SortDetails[];
  first: boolean;
  last: boolean;
  pageable: PageableDetails;
  empty: boolean;
}

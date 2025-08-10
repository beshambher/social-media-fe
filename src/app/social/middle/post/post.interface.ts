import { UserResponse } from 'src/app/core/services/auth/user-response.interface';
import { PageableDetails, SortDetails } from 'src/app/shared/models/pageable.interface';

export interface Post {
  id: string;
  body: string;
  likes: number;
  commentsCount: number;
  user: UserResponse;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedPostsResponse {
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  numberOfElements: number;
  content: Post[];
  sort: SortDetails[];
  first: boolean;
  last: boolean;
  pageable: PageableDetails;
  empty: boolean;
}

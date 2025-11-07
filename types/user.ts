export interface User {
  id: string
  mode: string
  name: string
  role: string
  email: string
  family_id: string
  photo_url: string
  color_code: string
  created_at: string
  is_active: boolean
  updated_at: string
  currency_code: string
}

export interface GetUserRequest {
  id: string;
}

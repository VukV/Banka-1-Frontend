export interface JwtPayload{
  userId: number,
  sub: string, //subject je email
  roles: string[]
}




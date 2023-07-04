export interface JwtPayload{
  //TODO check if ok?
  userId: number,
  sub: string, //subject je email
  roles: string[]
}




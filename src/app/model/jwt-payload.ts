export interface JwtPayload{
  //TODO - token mozda ne bude izgledao ovako; dogovor sa backend-om
  userId: number,
  sub: string,
  roles: string[]
}




// import { HttpResponse } from '../protocols/http'
// export const badRequest = (error: Error): HttpResponse => {
//   return {
//     statusCode: 400,
//     body: error
//   }
// }
// Syntax Sugar
import { HttpResponse } from '../protocols/http'
export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

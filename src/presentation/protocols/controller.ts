import { HttpRequest, HttpResponse } from './http'
// Criação de uma interface
export interface Controller{
  handle(httpRequest: HttpRequest): HttpResponse
}

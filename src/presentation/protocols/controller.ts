import { HttpRequest, HttpResponse } from './http'
// Criação de uma interface para qualquer controlador
export interface Controller{
  handle(httpRequest: HttpRequest): HttpResponse
}

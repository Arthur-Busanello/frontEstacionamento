import axios, { AxiosInstance } from "axios";

import { Modelo } from "@/models/ModeloModel";
import { PageRequest } from "@/models/pages/page-request";
import { PageResponse } from "@/models/pages/page-response";

 class ModeloClient {
    
    private axiosClient : AxiosInstance

    constructor(){
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/modelo',
            headers: {'Content-Type' : 'application/json'}
        });
    }

    public async findById(id : number) : Promise<Modelo> {
        try {
            return (await this.axiosClient.get<Modelo>(`/${id}`)).data
        } catch (error : any) {
            return Promise.reject(error.response)
        }
    }

    public async listAll() : Promise<Modelo[]> {
        try {
            return (await this.axiosClient.get<Modelo[]>(`/lista`)).data
        } catch (error : any) {
            return Promise.reject(error.response)
        }
    }

    public async findByAtivo() : Promise<Modelo[]> {
        try {
            return (await this.axiosClient.get<Modelo[]>(`/ativo`)).data
        } catch (error : any) {
            return Promise.reject(error.response)
        }
    }

    public async cadastrar(modelo : Modelo) :Promise<string> {
        try {
            return (await this.axiosClient.post<string>(`/create`, modelo)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async editar(id: number, modelo : Modelo) : Promise<string> {
        try {
            return (await this.axiosClient.put<string>(`/edit/${id}`, modelo)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }
    public async deletar(id: number): Promise<string> {
        try {
            return (await this.axiosClient.delete<string>(`/delete/${id}`)).data
        } catch (error : any) {
            return Promise.reject(error.response)
        }
    }


    public async findByFiltrosPaginado(pageRequest : PageRequest) : Promise<PageResponse<Modelo>> {
        try {
            let requestPath = ''

            requestPath += `?page=${pageRequest.currentPage}`
            requestPath += `&size=${pageRequest.pageSize}`
            requestPath += `&sort=${pageRequest.sortField === undefined ? '' : pageRequest.sortField}, ${pageRequest.direction}`

            return (await this.axiosClient.get<PageResponse<Modelo>>(requestPath, {params : {filtros : pageRequest.filter } })).data
        } catch (error : any) {
            return Promise.reject(error.response)
        }
    }
}
export default new ModeloClient();
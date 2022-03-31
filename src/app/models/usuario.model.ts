export interface UsuarioModel {
    id: number,
    firstName: string,
    lastName: string,
    birthDate: string,
    phoneNumber?: string,
    email: string,
    password: string,
	acceptTerms: boolean,
    nomeCompleto?: string
}
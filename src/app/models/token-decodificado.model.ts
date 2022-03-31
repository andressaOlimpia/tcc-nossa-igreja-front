export interface TokenDecodificadoModel {
    authorities: AuthoritiesModel;
    client_id: string;
    exp: number;
    nome: string;
    sobrenome: string;
    scope: ScopeModel;
    user_name: string;
    username: string;
    id: number;
}

export interface AuthoritiesModel {
    role: string;
}

export interface ScopeModel {
    scope: string;
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private jwtHelper = new JwtHelperService();

  ngOnInit(): void {

    this.criarMenuItems();
    this.verificarUsuarioLogado()
    
  }

  criarMenuItems(){
    this.items = [
      {
        label:'Meus dados',
        icon:'pi pi-fw pi-user-edit',
        routerLink: ['/meus-dados']
      },
      {
        label:'Doe a quem precisa',
        icon:'pi pi-fw pi-heart',
        //routerLink: ['/doacoes']
        routerLink: ['/em-construcao']
      },
      {
        label:'Grupos de comunhão',
        icon:'pi pi-fw pi-map',
        routerLink: ['/grupos-comunhao/lista']
      },
      {
        label:'Administrativo',
        icon:'pi pi-fw pi-briefcase',
        items:[
          {label:'Doe a quem precisa', 
          //routerLink: ['adm/doacoes']
          routerLink: ['/em-construcao']
          },
          {label:'Famílias', 
          //routerLink: ['adm/familias']
          routerLink: ['/em-construcao']
          },
          {label:'Itens de doação', 
          //routerLink: ['adm/itens-doacao']
          routerLink: ['/em-construcao']
          },
          {label:'Grupos de comunhão', routerLink: ['adm/grupos-comunhao/lista']},
        ]
      }
    ];
  }

  verificarUsuarioLogado():boolean{
    const token = localStorage.getItem('token');
    if (token !== '' && token !== null && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('username');
    localStorage.removeItem('nomeUsuario');
    localStorage.removeItem('sobrenomeUsuario');

    this.router.navigate(['login'])
  }
}

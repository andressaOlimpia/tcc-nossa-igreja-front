import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RoleModel, UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios: UsuarioModel[];
  usuarioSelecionado: UsuarioModel;
  edicaoUsuarioForm: FormGroup;
  totalRecords: number;
  cols: any[];
  exportColumns: any[];
  exportUsuarios: any[];

  permissoes: RoleModel[];
  selectedPermissao: RoleModel;
  displayModalPermissao: boolean;
  displayModalEdicao: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    this.usuarios = this.activatedRoute.snapshot.data['usuarios'];
    this.totalRecords = this.usuarios.length;
   }

  ngOnInit(): void {
    this.criaColunas()
    this.consultarRoles()
    this.criarFormularioEdicao()
  }

  criaColunas(){
    this.cols = [
      { field: 'nomeCompleto', header: 'Nome' },
      { field: 'birthDate', header: 'Data de nascimento' },
      { field: 'phoneNumber', header: 'Nº de telefone' },
      { field: 'email', header: 'E-mail' },
      { field: 'roles', header: 'Permissão' },
  ];

  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }


  consultarRoles(){
    this.usuarioService.listarUsuariosRoles()
    .subscribe(response => {
      this.permissoes = response;
      console.log(this.permissoes)
    })
  }

  criarFormularioEdicao(){
    this.edicaoUsuarioForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      birthDate: ["", Validators.required],
      phoneNumber: "",
    }); 
  }

  showModalEdicaoPermissao(usuario: UsuarioModel) {
    this.displayModalPermissao = true;
    this.usuarioSelecionado = usuario
    this.selectedPermissao = this.permissoes[0]
  }

  showModalEdicao(usuario: UsuarioModel) {
    this.displayModalEdicao = true;
    this.usuarioSelecionado = usuario

    this.edicaoUsuarioForm.patchValue({
      firstName: this.usuarioSelecionado.firstName,
      lastName: this.usuarioSelecionado.lastName,
      email: this.usuarioSelecionado.email,
      birthDate: this.datePipe.transform(this.usuarioSelecionado.birthDate, 'dd/MM/yyyy'),
      phoneNumber:this.usuarioSelecionado.phoneNumber
    })
  }

  editarPermissaoUsuario(){
    this.usuarioSelecionado.roles = [this.selectedPermissao]
    this.usuarioService.editarUsuarioRole(this.usuarioSelecionado)
    .subscribe(
      (data: UsuarioModel) => {
        let indexUsuarioEditado = this.usuarios.findIndex(usuario => usuario.id === data.id)
        this.usuarios.splice(indexUsuarioEditado,1, data)
        this.displayModalPermissao = false;
        this.messageService.add({severity: 'success', summary: 'Eba!', detail: 'Permissão alterada com sucesso'});
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.messageService.add({severity: 'error', summary: 'Ops', detail: 'Algo deu errado, permissão não alterada'});
      });
    

  }

  editarUsuario(){
    this.usuarioSelecionado = Object.assign({}, this.usuarioSelecionado, this.edicaoUsuarioForm.value);
    let dataNascimento = this.usuarioSelecionado.birthDate.split("/").reverse().join('-')
    this.usuarioSelecionado.birthDate = dataNascimento
    console.log(this.usuarioSelecionado)

    this.usuarioService.editarUsuario(this.usuarioSelecionado)
    .subscribe(
      (data: UsuarioModel) => {
        let indexUsuarioEditado = this.usuarios.findIndex(usuario => usuario.id === data.id)
        this.usuarios.splice(indexUsuarioEditado,1, data).sort(function(a,b) {
          return a.firstName < b.firstName ? -1 : a.firstName > b.firstName ? 1 : 0;
        });
        this.displayModalEdicao = false;
        this.messageService.add({severity: 'success', summary: 'Eba!', detail: 'Dados alterados com sucesso'});
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.messageService.add({severity: 'error', summary: 'Ops', detail: 'Algo deu errado, alterações não realizadas'});
      });

  }

  excluirUsuario(usuario: any){
      this.confirmationService.confirm({
        message: `Você tem certeza que deseja excluir o usuário ${usuario.nomeCompleto}`,
        header: 'Atenção',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.usuarioService.excluirUsuario(usuario.id).subscribe(
            () => {
              this.messageService.add({severity:'success', summary:'Sucesso', detail:'Usuário excluído'});
              this.usuarios = this.usuarios.filter(grupo => grupo.id !== usuario.id)
            }
          )
        }
    });
  }

  exportPdf(){
    this.exportUsuarios = JSON.parse(JSON.stringify(this.usuarios))
    console.log(this.exportUsuarios)
    
    this.exportUsuarios.map(usuario => {
      usuario.roles = this.concatPermissoes(usuario.roles);
    })

    import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc = new jsPDF.default("l");
            (doc as any).autoTable(this.exportColumns, this.exportUsuarios);
            doc.save('usuarios.pdf');
        })
    })
  }

  concatPermissoes(permissoes){
    let rolesNomes: string = '';
    permissoes.forEach(element => {
      rolesNomes = rolesNomes.concat(`${element.name} `)
    });
    return rolesNomes;
  }
}

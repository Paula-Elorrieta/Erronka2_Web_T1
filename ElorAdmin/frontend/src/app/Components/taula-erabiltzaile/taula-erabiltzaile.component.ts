import { Component, OnInit } from '@angular/core';
import { TableModule, TablePageEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { User } from '../../interface/user';
import { QueryService } from '../../services/query.service';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AuthService } from '../../services/auth.service';
import { ArgazkiPipe } from '../../pipes/argazki.pipe';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EzabatuDialogComponent } from '../../users/ezabatu-dialog/ezabatu-dialog.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-taula-erabiltzaile',
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    AvatarModule,
    AvatarGroupModule,
    ArgazkiPipe,
    TranslateModule,
    ConfirmDialogModule,
    DialogModule,
  ],
  templateUrl: './taula-erabiltzaile.component.html',
  styleUrls: ['./taula-erabiltzaile.component.css'],
  standalone: true,
  providers: [ MessageService, ConfirmationService ],
})
export class TaulaErabiltzaileComponent implements OnInit {
  erabiltzaileak: User[] = [];
  erabiltzaileLogueatua!: User;
  first: number = 0;
  rows: number = 10;
  selectedUser!: User;
  displayDeleteDialog: boolean = false; // Declaración de la propiedad para mostrar el diálogo
  reunionesCount: number = 0;

  constructor(
    private queryS: QueryService,
    private authS: AuthService,
    private router: Router,
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
  ) {
    this.translateService.setDefaultLang('eu');
    this.translateService.use('eu');
  }

  ngOnInit() {
    this.erabiltzaileLogueatua = this.authS.getErabiltzaileLogueatua();

    this.queryS.getErabiltzaileakEtaMezua().subscribe(
      (response) => {
        console.log('Erabiltzaileak lortu dira:', response);
        this.erabiltzaileak = response.users;
        console.log(this.erabiltzaileak);

        let ikasleCop = 0;
        this.erabiltzaileak.forEach( erabiltzaile => {
          if (erabiltzaile.tipo_id === 4) {
            ikasleCop++;
          }
        });
        this.queryS.setErabiltzaileCount(ikasleCop  );
      },
      (error) => {
        console.error('Errorea erabiltzaileak kargatzean:', error);
      }
    );

    
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.first >= this.erabiltzaileak.length - this.rows;
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  ikusiXehetasunak(user: User) {
    this.router.navigate(['/users/details', user.id]);
  }


  openDeleteDialog(user: User) {
    this.selectedUser = user; // Asignar el usuario seleccionado al diálogo
    this.displayDeleteDialog = true; // Mostrar el diálogo
  }
  
  ezabatuUser(user: User) {
    // Aquí puedes agregar la lógica para eliminar al usuario
    console.log(`Usuario ${user.nombre} eliminado.`);
  
    // Llamar a la API para eliminar al usuario, por ejemplo:
    // this.queryService.deleteUser(user.id).subscribe(() => {
    //   this.messageService.add({ severity: 'success', summary: 'Usuario eliminado', detail: `${user.nombre} ha sido eliminado.` });
    // });
  
    // Cerrar el diálogo después de eliminar
    this.displayDeleteDialog = false;
  }

  gehituErabiltzaile() {
    this.router.navigate(['/users/gehitu']);
  }

  editatuErabiltzaile(user: User) {
    this.router.navigate(['/users/editatu', user.id]);
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { User } from '../../interface/user';
import { ArgazkiPipe } from '../../pipes/argazki.pipe';
import { AuthService } from '../../services/auth.service';
import { QueryService } from '../../services/query.service';

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
    ConfirmDialog,
    ToastModule,
    ButtonModule,
  ],
  templateUrl: './taula-erabiltzaile.component.html',
  styleUrls: ['./taula-erabiltzaile.component.css'],
  standalone: true,
  providers: [MessageService, ConfirmationService],
})
export class TaulaErabiltzaileComponent implements OnInit {
  erabiltzaileak: User[] = [];
  erabiltzaileLogueatua!: User;
  first: number = 0;
  rows: number = 10;
  selectedUser!: User;
  reunionesCount: number = 0;
  id: string = '';

  constructor(
    private queryS: QueryService,
    private authS: AuthService,
    private router: Router,
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
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
        this.erabiltzaileak.forEach((erabiltzaile) => {
          if (erabiltzaile.tipo_id === 4) {
            ikasleCop++;
          }
        });
        this.queryS.setErabiltzaileCount(ikasleCop);
      },
      (error) => {
        console.error('Errorea erabiltzaileak kargatzean:', error);
      }
    );
  }

  confirmEzabatzea(erabiltzailea: User) {
    this.translateService
      .get([
        'delete-message',
        'delete-header',
        'delete',
        'cancel',
        'rejected-summary',
        'rejected-detail',
        'confirmed',
        'delete-message',
        'confirm-delete',
      ])
      .subscribe((translations) => {
        this.confirmationService.confirm({
          message: translations['delete-message'].replace(
            '{{username}}',
            erabiltzailea.username
          ),
          header: translations['delete-header'],
          icon: 'pi pi-info-circle',
          acceptLabel: translations['delete'],
          rejectLabel: translations['cancel'],
          rejectButtonProps: { severity: 'secondary', outlined: true },
          acceptButtonProps: { severity: 'danger' },
          accept: () => {
            this.deleteUser(erabiltzailea.id!.toString());
            this.messageService.add({
              severity: 'info',
              summary: translations['confirmed'],
              detail: translations['confirm-delete'].replace(
                '{{username}}',
                erabiltzailea.username
              ),
            });
          },
          reject: () => {
            this.messageService.add({
              severity: 'error',
              summary: translations['rejected-summary'],
              detail: translations['rejected-detail'],
            });
          },
        });
      });
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

  gehituErabiltzaile() {
    this.router.navigate(['/users/gehitu']);
  }

  editatuErabiltzaile(user: User) {
    this.router.navigate(['/users/editatu', user.id]);
  }

  deleteUser(id: string) {
    this.queryS.deleteUser(id).subscribe(
      (response) => {
        console.log('Erabiltzailea ondo ezabatu da:', response);
        window.location.reload();
      },
      (error) => {
        console.error('Error al eliminar el usuario:', error);
      }
    );
  }
}

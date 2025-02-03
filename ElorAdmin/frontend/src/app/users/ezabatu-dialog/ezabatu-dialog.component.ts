import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../../interface/user';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-ezabatu-dialog',
  templateUrl: './ezabatu-dialog.component.html',
  imports: [DialogModule, ButtonModule],
  styleUrls: ['./ezabatu-dialog.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class EzabatuDialogComponent {
  @Input() display: boolean = false;
  @Input() selectedUser!: User;
  @Output() displayChange = new EventEmitter<boolean>();
  @Output() onDelete = new EventEmitter<User>();

  closeDialog() {
    this.display = false;
  }

  deleteUser() {
    this.onDelete.emit(this.selectedUser); // Emitir el evento de eliminación
    this.closeDialog(); // Cerrar el diálogo
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-user-login',
  templateUrl: './modal-user-login.component.html',
  styleUrls: ['./modal-user-login.component.scss'],
})
export class ModalUserLoginComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}

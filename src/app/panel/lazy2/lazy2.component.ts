import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { CustomersService } from '../../shared/services/data/customers.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Title } from '@angular/platform-browser';
import { Customer, Invoice } from '../../shared/types';
import { delay } from '../../shared/functions/fn';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@ngbracket/ngx-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lazy2',
  templateUrl: './lazy2.component.html',
  styleUrls: ['./lazy2.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatTableModule, FlexModule, MatButtonModule],
})
export class InvoicesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'userId', 'title'];

  dataSource!: any;
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  titleService = inject(Title);
  notificationService = inject(NotificationService);
  rows!: Customer[];
  customers = inject(CustomersService);
  changeDetector = inject(ChangeDetectorRef);
  matDialog = inject(MatDialog);
  constructor() {}

  ngOnInit() {
    this.titleService.setTitle('Issue - Invoices');
    this.notificationService.openSnackBar('Invoices loaded');
    this.work();
  }

  ngAfterViewInit() {
    this.work();
  }

  async work() {
    //await delay(0);
    this.rows = await this.customers.findAll();

    this.dataSource = new MatTableDataSource(this.rows);
    this.dataSource.sort = this.sort;
    this.changeDetector.detectChanges();
  }
}

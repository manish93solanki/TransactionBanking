import { Component } from '@angular/core';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-filter',
  templateUrl: './transaction-filter.component.html'
})
export class TransactionFilterComponent {

  transactions: any[] = [];
  accountId: number | null = null;
  transactionType: string = '';
  status: string = '';
  minAmount: number | null = null;
  maxAmount: number | null = null;
  startDate: string = '';
  endDate: string = '';

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.loadAllTransactions(); // Load all on init
  }

  loadAllTransactions() {
    this.transactionService.getAllTransactions().subscribe(data => {
      this.transactions = data;
    });
  }

  applyFilters() {
    const filters = {
      accountId: this.accountId,
      transactionType: this.transactionType,
      status: this.status,
      minAmount: this.minAmount,
      maxAmount: this.maxAmount,
      startDate: this.startDate,
      endDate: this.endDate
    };

    this.transactionService.getFilteredTransactions(filters).subscribe(data => {
      this.transactions = data;
    });
  }

  resetFilters() {
    this.accountId = null;
    this.transactionType = '';
    this.status = '';
    this.minAmount = null;
    this.maxAmount = null;
    this.startDate = '';
    this.endDate = '';
    this.loadAllTransactions();
  }

}

import { Observable } from 'rxjs';
import { LoansService } from './loans-service';
import { map } from 'rxjs/operators';
import { Loan } from './loan';

export class LoansCalculatorService {
  constructor(private loansService: LoansService) {
  }

  public getAverageLoanByRating(rating: string): Observable<number> {
    return this.loansService.getLoansByRating(rating)
      .pipe(map(loans => this.getAverageLoan(loans)));
  }

  private getAverageLoan(loans: Array<Loan>): number {
    const amount = loans.reduce((sum, loan) => sum + loan.amount, 0);
    const count = loans.length;

    return count > 0 ? amount / count : 0;
  }
}

import { Component, OnDestroy, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { AuthHttpService } from "./auth-http.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  // SUBJECTS
  private _unsubscribeAll = new Subject<any>();

  constructor(
    private _authHttpService: AuthHttpService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  /**
 * On destroy
 */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}

import { AfterContentInit, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'ffxiv-bozjan-tracker-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit, AfterContentInit {

  public isVisible = false;
  public isConfirmLoading = false;

  public triggerAlertModal = false;

  public trackerId: string;

  public endDate$: Observable<number>;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.trackerId = params.id;
    });
  }

  ngAfterContentInit() {
    this.firestore.collection('trackers').doc(this.trackerId).ref.get()
      .then((doc) => {
        if (doc.exists) {
          if (doc.data().respawnDate.toDate().getTime() > new Date().getTime()) {
            this.endDate$ = doc.data().respawnDate.toDate().getTime();
          }
        } else {
          this.triggerAlertModal = true;
        }
      });
  }

  showResetModal(): void {
    this.isVisible = true;
  }

  handleReset() {
    this.isConfirmLoading = true;

    return new Promise<any>((resolve, reject) => {
      this.firestore
      .collection('trackers')
      .doc(this.trackerId)
      .set({
        respawnDate: new Date(Date.now() + 60*60*1000)
      })
      .then(res => {
        this.firestore.collection('trackers').doc(this.trackerId).ref.get()
          .then((doc) => {
            this.endDate$ = doc.data().respawnDate.toDate().getTime();
          })
        this.isVisible = false;
        this.isConfirmLoading = false;
      }, err => reject(err));
    });
  }

  handleCancel() {
    this.isVisible = false;
  }

}

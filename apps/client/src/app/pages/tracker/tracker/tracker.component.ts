import { AfterContentInit, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Params } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';

import { Timer } from '../../../model/common/timer';

@Component({
  selector: 'ffxiv-bozjan-tracker-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit, AfterContentInit {

  public isVisible = false;
  public isConfirmLoading = false;

  public triggerAlertModal = false;
  public isSoundActive = false;

  public trackerId: string;

  public lastSpawnTime = 0;
  public endDate$: Observable<number>;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private message: NzMessageService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.trackerId = params.id;
    });
  }

  ngAfterContentInit() {
    this.firestore.collection('trackers').doc<Timer>(this.trackerId).valueChanges()
      .subscribe(data => {
        if (data) {
          const trackerData = data;
          if (trackerData.respawnDate.toDate().getTime() > new Date().getTime()) {
            this.endDate$ = trackerData.respawnDate.toDate().getTime();
          }
        } else {
          this.triggerAlertModal = true;
        }
      });
  }

  showResetModal(): void {
    this.isVisible = true;
  }

  triggerAlertSound(event) {
    if(event.action === "notify" && this.isSoundActive) {
      const alertSound = new Audio();
      alertSound.src = '../../../../assets/audio/Feature_unlocked.mp3';
      alertSound.load();
      alertSound.play();
    } 
  }

  handleReset() {
    this.isConfirmLoading = true;

    return new Promise<any>((resolve, reject) => {
      this.firestore
      .collection('trackers')
      .doc(this.trackerId)
      .set({
        respawnDate: new Date(Date.now() + 60*60*1000 - 60*this.lastSpawnTime*1000)
      })
      .then(res => {
        this.firestore.collection('trackers').doc(this.trackerId).ref.get()
          .then((doc) => {
            this.endDate$ = doc.data().respawnDate.toDate().getTime();
          })
        this.isVisible = false;
        this.isConfirmLoading = false;
        this.lastSpawnTime = 0;

        this.message.info('Timer Reset successful !');
      }, err => reject(err));
    });
  }

  handleCancel() {
    this.isVisible = false;
  }

}

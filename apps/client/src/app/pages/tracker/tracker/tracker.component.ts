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

  public castrumModalIsVisible = false;
  public castrumModalIsConfirmLoading = false;

  public starmobsModalIsVisible = false;
  public starmobsModalIsConfirmLoading = false;

  public triggerAlertModal = false;
  public isSoundActive = false;

  public trackerId: string;

  public lastSpawnTime = 0;

  public castrumRespawnTimer$: Observable<number>;

  public tidebornTimer$: Observable<number>;
  public fernTimer$: Observable<number>;
  public clawTimer$: Observable<number>;
  public psoglavTimer$: Observable<number>;
  public viyTimer$: Observable<number>;
  public smokTimer$: Observable<number>;
  public pattyTimer$: Observable<number>;
  public clareTimer$: Observable<number>;
  public barathrumTimer$: Observable<number>;

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
          if (trackerData.castrumRespawnDate.toDate().getTime() > new Date().getTime()) {
            this.castrumRespawnTimer$ = trackerData.castrumRespawnDate.toDate().getTime();
          }
          if (trackerData.tidebornTimer.toDate().getTime() > new Date().getTime()) {
            this.tidebornTimer$ = trackerData.tidebornTimer.toDate().getTime();
          }
          if (trackerData.fernTimer.toDate().getTime() > new Date().getTime()) {
            this.fernTimer$ = trackerData.fernTimer.toDate().getTime();            
          }
          if (trackerData.clawTimer.toDate().getTime() > new Date().getTime()) {
            this.clawTimer$ = trackerData.clawTimer.toDate().getTime();            
          }
          if (trackerData.psoglavTimer.toDate().getTime() > new Date().getTime()) {
            this.psoglavTimer$ = trackerData.psoglavTimer.toDate().getTime();            
          }
          if (trackerData.viyTimer.toDate().getTime() > new Date().getTime()) {
            this.viyTimer$ = trackerData.viyTimer.toDate().getTime();            
          }
          if (trackerData.smokTimer.toDate().getTime() > new Date().getTime()) {
            this.smokTimer$ = trackerData.smokTimer.toDate().getTime();            
          }
          if (trackerData.pattyTimer.toDate().getTime() > new Date().getTime()) {
            this.pattyTimer$ = trackerData.pattyTimer.toDate().getTime();            
          }
          if (trackerData.clareTimer.toDate().getTime() > new Date().getTime()) {
            this.clareTimer$ = trackerData.clareTimer.toDate().getTime();            
          }
          if (trackerData.barathrumTimer.toDate().getTime() > new Date().getTime()) {
            this.barathrumTimer$ = trackerData.barathrumTimer.toDate().getTime();            
          }
        } else {
          this.triggerAlertModal = true;
        }
      });
  }

  showResetModal(): void {
    this.castrumModalIsVisible = true;
  }

  triggerAlertSound(event) {
    if(event.action === "notify" && this.isSoundActive) {
      const alertSound = new Audio();
      alertSound.src = '../../../../assets/audio/Feature_unlocked.mp3';
      alertSound.load();
      alertSound.play();
    } 
  }

  handleCastrumReset() {
    this.castrumModalIsConfirmLoading = true;

    return new Promise<any>((resolve, reject) => {
      this.firestore
      .collection('trackers')
      .doc(this.trackerId)
      .update({
        castrumRespawnDate: new Date(Date.now() + 60*60*1000 - 60*this.lastSpawnTime*1000)
      })
      .then(res => {
        this.firestore.collection('trackers').doc(this.trackerId).ref.get()
          .then((doc) => {
            this.castrumRespawnTimer$ = doc.data().castrumRespawnDate.toDate().getTime();
          })
        this.castrumModalIsVisible = false;
        this.castrumModalIsConfirmLoading = false;
        this.lastSpawnTime = 0;

        this.message.info('Timer Reset successful!');
      }, err => reject(err));
    });
  }

  handleStarmobsReset(starmob: String) {
    this.starmobsModalIsConfirmLoading = true;

    if (starmob === "tideborn") {
      return new Promise<any>((resolve, reject) => {
        this.firestore.collection('trackers').doc(this.trackerId).update({
          tidebornTimer: new Date(Date.now() + 60*30*1000 - 60*this.lastSpawnTime*1000)
        })
        .then(res => {
          this.firestore.collection('trackers').doc(this.trackerId).ref.get()
            .then((doc) => {
              this.tidebornTimer$ = doc.data().tidebornTimer.toDate().getTime();
            })
          this.starmobsModalIsVisible = false;
          this.starmobsModalIsConfirmLoading = false;
          this.lastSpawnTime = 0;

          this.message.info('Timer Reset successful!');
        }, err => reject(err))
      });
    }

    if (starmob === "fern") {
      return new Promise<any>((resolve, reject) => {
        this.firestore.collection('trackers').doc(this.trackerId).update({
          fernTimer: new Date(Date.now() + 60*30*1000 - 60*this.lastSpawnTime*1000)
        })
        .then(res => {
          this.firestore.collection('trackers').doc(this.trackerId).ref.get()
            .then((doc) => {
              this.fernTimer$ = doc.data().fernTimer.toDate().getTime();
            })
          this.starmobsModalIsVisible = false;
          this.starmobsModalIsConfirmLoading = false;
          this.lastSpawnTime = 0;

          this.message.info('Timer Reset successful!');
        }, err => reject(err))
      });
    }

    if (starmob === "claw") {
      return new Promise<any>((resolve, reject) => {
        this.firestore.collection('trackers').doc(this.trackerId).update({
          clawTimer: new Date(Date.now() + 60*30*1000 - 60*this.lastSpawnTime*1000)
        })
        .then(res => {
          this.firestore.collection('trackers').doc(this.trackerId).ref.get()
            .then((doc) => {
              this.clawTimer$ = doc.data().clawTimer.toDate().getTime();
            })
          this.starmobsModalIsVisible = false;
          this.starmobsModalIsConfirmLoading = false;
          this.lastSpawnTime = 0;

          this.message.info('Timer Reset successful!');
        }, err => reject(err))
      });
    }

    if (starmob === "psoglav") {
      return new Promise<any>((resolve, reject) => {
        this.firestore.collection('trackers').doc(this.trackerId).update({
          psoglavTimer: new Date(Date.now() + 60*30*1000 - 60*this.lastSpawnTime*1000)
        })
        .then(res => {
          this.firestore.collection('trackers').doc(this.trackerId).ref.get()
            .then((doc) => {
              this.psoglavTimer$ = doc.data().psoglavTimer.toDate().getTime();
            })
          this.starmobsModalIsVisible = false;
          this.starmobsModalIsConfirmLoading = false;
          this.lastSpawnTime = 0;

          this.message.info('Timer Reset successful!');
        }, err => reject(err))
      });
    }

    if (starmob === "viy") {
      return new Promise<any>((resolve, reject) => {
        this.firestore.collection('trackers').doc(this.trackerId).update({
          viyTimer: new Date(Date.now() + 60*30*1000 - 60*this.lastSpawnTime*1000)
        })
        .then(res => {
          this.firestore.collection('trackers').doc(this.trackerId).ref.get()
            .then((doc) => {
              this.viyTimer$ = doc.data().viyTimer.toDate().getTime();
            })
          this.starmobsModalIsVisible = false;
          this.starmobsModalIsConfirmLoading = false;
          this.lastSpawnTime = 0;

          this.message.info('Timer Reset successful!');
        }, err => reject(err))
      });
    }

    if (starmob === "smok") {
      return new Promise<any>((resolve, reject) => {
        this.firestore.collection('trackers').doc(this.trackerId).update({
          smokTimer: new Date(Date.now() + 60*30*1000 - 60*this.lastSpawnTime*1000)
        })
        .then(res => {
          this.firestore.collection('trackers').doc(this.trackerId).ref.get()
            .then((doc) => {
              this.smokTimer$ = doc.data().smokTimer.toDate().getTime();
            })
          this.starmobsModalIsVisible = false;
          this.starmobsModalIsConfirmLoading = false;
          this.lastSpawnTime = 0;

          this.message.info('Timer Reset successful!');
        }, err => reject(err))
      });
    }

    if (starmob === "patty") {
      return new Promise<any>((resolve, reject) => {
        this.firestore.collection('trackers').doc(this.trackerId).update({
          pattyTimer: new Date(Date.now() + 60*30*1000 - 60*this.lastSpawnTime*1000)
        })
        .then(res => {
          this.firestore.collection('trackers').doc(this.trackerId).ref.get()
            .then((doc) => {
              this.pattyTimer$ = doc.data().pattyTimer.toDate().getTime();
            })
          this.starmobsModalIsVisible = false;
          this.starmobsModalIsConfirmLoading = false;
          this.lastSpawnTime = 0;

          this.message.info('Timer Reset successful!');
        }, err => reject(err))
      });
    }

    if (starmob === "clare") {
      return new Promise<any>((resolve, reject) => {
        this.firestore.collection('trackers').doc(this.trackerId).update({
          clareTimer: new Date(Date.now() + 60*30*1000 - 60*this.lastSpawnTime*1000)
        })
        .then(res => {
          this.firestore.collection('trackers').doc(this.trackerId).ref.get()
            .then((doc) => {
              this.clareTimer$ = doc.data().clareTimer.toDate().getTime();
            })
          this.starmobsModalIsVisible = false;
          this.starmobsModalIsConfirmLoading = false;
          this.lastSpawnTime = 0;

          this.message.info('Timer Reset successful!');
        }, err => reject(err))
      });
    }

    if (starmob === "barathrum") {
      return new Promise<any>((resolve, reject) => {
        this.firestore.collection('trackers').doc(this.trackerId).update({
          barathrumTimer: new Date(Date.now() + 60*30*1000 - 60*this.lastSpawnTime*1000)
        })
        .then(res => {
          this.firestore.collection('trackers').doc(this.trackerId).ref.get()
            .then((doc) => {
              this.barathrumTimer$ = doc.data().barathrumTimer.toDate().getTime();
            })
          this.starmobsModalIsVisible = false;
          this.starmobsModalIsConfirmLoading = false;
          this.lastSpawnTime = 0;

          this.message.info('Timer Reset successful!');
        }, err => reject(err))
      });
    }
    
  }

  handleCastrumModalCancel() {
    this.castrumModalIsVisible = false;
  }

  handleStarmobsModalCancel() {
    this.starmobsModalIsVisible = false;
  }

}

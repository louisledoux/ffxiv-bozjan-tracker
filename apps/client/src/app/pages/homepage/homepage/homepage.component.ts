import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'ffxiv-bozjan-tracker-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {

  public searchedTrackerId: string;
  public doesntExist: boolean;

  private trackerId:string;

  constructor(private firestore: AngularFirestore, private router: Router) {}

  private randomIdGenerator(length) {
    let result = "";

    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;

    for(let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    this.trackerId = result;
  }

  async createTracker() {
    await this.randomIdGenerator(6);

    return new Promise<any>((resolve, reject) => {
      this.firestore
      .collection('trackers')
      .doc(this.trackerId)
      .set({
        respawnDate: new Date(Date.now() + 60*60*1000)
      })
      .then(res => {
        this.router.navigate(['./tracker', this.trackerId])
      }, err => reject(err));
    });
  }

  joinTracker() {
    this.firestore.collection('trackers').doc(this.searchedTrackerId).ref.get()
    .then((doc) => {
      if (doc.exists) {
        this.router.navigate(['./tracker', this.searchedTrackerId]);
      } else {
        this.doesntExist = true;
      }
    })
  }

  afterAlertClose() {
    this.doesntExist = false;
  }

}

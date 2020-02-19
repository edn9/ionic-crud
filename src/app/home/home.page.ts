import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  login: any = {};
  toast: any;
  constructor(public navCtrl: NavController, private http: HttpClient, public toastController: ToastController) { }

  onSubmit() {
    //this.login = this.email, this.password;
    this.login.action = "login";
    this.http.post('http://192.168.0.129/api/controller/AuthController.php', this.login).subscribe(data => {
      if (data['status'] == "success") {
        var message = "Logado com sucesso!";
        this.showToast(message);
        this.navCtrl.navigateForward('/dashboard');
      } else {
        var message = data['status'];
        this.showToast(message);
      }
    }, err => {
      this.showToast(err);
    })
  }

  async showToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'middle',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        }
      ]
    });
    toast.present();
  }

  register() {
    this.navCtrl.navigateForward('/register');
  }
}

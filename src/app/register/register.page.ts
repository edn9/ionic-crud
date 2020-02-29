import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  register: any = {};
  toast: any;
  constructor(public navCtrl: NavController, private http: HttpClient, public toastController: ToastController) { }

  ngOnInit() {
  }

  onSubmit() {
    this.register.action = "insert";
    this.http.post("http://localhost/api/controller/Register.php", this.register).subscribe(data => {
      if (data['status'] == "success") {
        var message = "Registrado com sucesso!";
        this.showToast(message);
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

  back() {
    this.navCtrl.back();
  }
}

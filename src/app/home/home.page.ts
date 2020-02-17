import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  email: string = "";
  password: string = "";
  login: any = {};
  constructor(public navCtrl: NavController, private http: HttpClient) { }

  onSubmit() {
    this.login = this.email, this.password;
    console.log(this.login);
    this.http.post('api/controller/AuthController.php', this.login).subscribe(data => {
      console.log(data);
      let result = JSON.parse(data["_body"]);
      if (result.status == "success") {
        console.log('Sucesso!')
      }
      else {
        console.log('Algo deu errado!')
      }
    }, err => {
      console.log(err);
    })
  }

  register() {
    this.navCtrl.navigateForward('/register');
  }
}

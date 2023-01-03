import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  LoginForm:any=FormGroup;
  form: any=FormGroup;
  submitted = false;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private loadingController: LoadingController,
    private auth: AuthService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.LoginForm = this.formBuilder.group({
      name: ['boy@test.com', [Validators.required]],
      // email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      // dob: [],
      password: ['test123', [Validators.required]]
    })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading',
      duration: 2000,
      spinner: 'bubbles'
    });
    await loading.present();
  }
  async login(){
    this.presentLoading();
    let body = {
      email: this.LoginForm.value.name,
      password: this.LoginForm.value.password
    }
     this.http.post(environment.API +'/boy/login', body)
     
     .subscribe((login) =>
     {
      console.log(login);
      this.loadingController.dismiss();
      this.router.navigate(['home'])

      
     }, (error) =>{
      console.log(error);
      this.loadingController.dismiss();

      
     })
    
  }
  get errorCtr() {
    return this.LoginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.LoginForm.valid) {
      console.log('All fields are required.')
      return false;
    } else {
      console.log(this.LoginForm.value)
    }
  }
  Signup(){
    this.router.navigate(['register'])
  }

}

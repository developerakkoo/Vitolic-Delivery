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
    private auth: AuthService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.LoginForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      // email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      // dob: [],
      password: ['', [Validators.required]]
    })
  }

  login(){
    let body = {
      email: this.LoginForm.name,
      password: this.LoginForm.password
    }
     this.http.post(environment.API +'/boy/login', body).subscribe((login) =>{
      console.log(login);
      
     }, (error) =>{
      console.log(error);
      
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

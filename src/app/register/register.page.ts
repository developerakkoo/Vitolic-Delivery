import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  SignUpForm: any=FormGroup;
  submitted = false;
  constructor(private router:Router,private formBuilder: FormBuilder,private fb: FormBuilder) { }

  ngOnInit() {
    this.SignUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      // dob: [],
      password: ['', [Validators.required]]
    })
  }
  Login(){
    this.router.navigate(['login']);
  }
  get errorCtr() {
    return this.SignUpForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.SignUpForm.valid) {
      console.log('All fields are required.')
      return false;
    } else {
      console.log(this.SignUpForm.value)
    }
  }
  getSignup(){
    this.router.navigate(['assigend-orders'])
  }
}

import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/service/login-service.service';
import { FormGroup } from '@angular/forms';
import { UserProfile } from 'src/app/components/models/userProfile';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public users: any;
  public allUsers: any;
  registerForm: FormGroup;
  submitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: String[] = [];
  form: UserProfile = new UserProfile();
  constructor(private loginServiceService: LoginServiceService, private toastr: ToastrService,
              private userService: UserService) { }

  ngOnInit() {
    this.loginServiceService.getUser().subscribe(data => {
      this.users = data ;
    });

    this.userService.getAllUser().subscribe(data => {
      this.allUsers = data.content ;
      console.log(this.allUsers);

    });
  }

 chooseRoles(event) {
  if (event.target.checked == true) {
    this.roles.push(event.target.value);
  } else {
    if (this.roles.length > 0)
    {
      for (let index = 0; index < this.roles.length; index++) {
        const element = this.roles[index];
        if (element == event.target.value)
        {
          this.roles[index] = '';
        }
      }
    }
  }
 }

  onSubmit() {
    this.form.createdBy = this.users.username;
    this.form.roles = this.roles;
    this.loginServiceService.addUser(this.form)
    .subscribe( data =>
      this.toastr.success('User has been created successfully', 'Success!'),
       error => console.log(error)
    );
  }
}

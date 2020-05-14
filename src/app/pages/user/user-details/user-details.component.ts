import { Component, OnInit,ViewChild, Output, Input} from '@angular/core';
import { UserService } from 'src/service/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserProfile } from 'src/app/components/models/userProfile';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit {
  closeResult = '';
  users: UserProfile[] = [];
  page: any;
  form: UserProfile = new UserProfile();
  id: String;
  displayedColumns: string[] = ['nomUsers', 'email', 'telUsers', 'adresseUsers', 'posteUsers'];
  dataSource: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userService: UserService,  private toastr: ToastrService,
              private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {

    this.userService.getAllUser().subscribe(data => {
      this.users = data.content;
      this.dataSource = new MatTableDataSource<UserProfile>(this.users);
      this.dataSource.paginator = this.paginator;
    });

  }

  open(content, userUpdate) {
    this.form = userUpdate;
    this.id =  userUpdate.id;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  updateUser() {
    this.userService.updateUser(this.id, this.form)
      .subscribe(data =>
        this.toastr.success('User has been modifier successfully', 'Success!'),
         error => console.log(error));
    this.form = new UserProfile();
  }

}

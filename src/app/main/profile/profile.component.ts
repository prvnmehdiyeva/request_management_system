import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ProfilechangedialogComponent } from './profilechangedialog/profilechangedialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  currentComponent: string = 'profile'; 
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() userJob: string = '';
  @Input() department: string = '';
  @Input() mission: string = '';
  @Input() internalTelephone: string = '';
  @Input() mobileTelephone: string = '';
  @Input() image: string = '';
  @Input() password: string = '';
  changeProfileForm: FormGroup;


  constructor(
     private route: ActivatedRoute, 
     @Inject(PLATFORM_ID) private platformId:Object, 
     private fb: FormBuilder,     
     private authService: AuthService,
     private snackBar: MatSnackBar,
     private dialog: MatDialog
  )
  {
    this.changeProfileForm = this.fb.group({
      newDepartment: ['', Validators.required],
      newMission: ['', [Validators.required]],
      newInternalTelephone: ['', Validators.required],
      newMobileTelephone: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') || ''; 
    });

    if(isPlatformBrowser(this.platformId)){
      const currentUserString = sessionStorage.getItem('currentUser');
  
      if (currentUserString) {
        const currentUser = JSON.parse(currentUserString);
        
        this.id = currentUser.id || '';
        this.name = currentUser.name || '';
        this.userJob = currentUser.userJob || '';
        this.department = currentUser.department || '';
        this.mission = currentUser.mission || '';
        this.internalTelephone = currentUser.internalTelephone || ''; 
        this.mobileTelephone = currentUser.mobileTelephone || ''; 
        this.password = currentUser.password || ''; 
        this.image = currentUser.image || ''; 
  
        console.log('User ID:', this.id);
        console.log('User name:', this.name);
        console.log('User image:', this.image);
      } else {
        console.error('currentUser not found in sessionStorage.');
      }
    } 
  }
  
  onSubmit(){
    const newDepartment = this.changeProfileForm.get('newDepartment')?.value;
    const newMission = this.changeProfileForm.get('newMission')?.value;
    const newInternalTelephone = this.changeProfileForm.get('newInternalTelephone')?.value;
    const newMobileTelephone = this.changeProfileForm.get('newMobileTelephone')?.value;

    const updatedProfileData = {
      id: this.id,
    department: newDepartment !== '' ? newDepartment : this.department,
    mission: newMission !== '' ? newMission : this.mission,
    internalTelephone: newInternalTelephone !== '' ? newInternalTelephone : this.internalTelephone,
    mobileTelephone: newMobileTelephone !== '' ? newMobileTelephone : this.mobileTelephone,
    name: this.name,
    userJob: this.userJob,
    password: this.password, 
    image: this.image 
    };

    this.authService.updateUserProfile(updatedProfileData).subscribe(() => {
      this.openSuccessDialog();
      this.changeProfileForm.reset();
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000, 
      verticalPosition: 'top' 
    });
  }
  openSuccessDialog() {
    this.dialog.open(ProfilechangedialogComponent, {
      width: '400px',
      position: { top: '20%' }
    });
  }
}

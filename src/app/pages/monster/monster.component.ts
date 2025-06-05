import { MonsterType } from './../../utils/monster.utils';
import { Monster } from './../../models/monster.model';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { MonsterService } from '../../services/monster/monster.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { DeleteMonsterConfirmationDialogComponent } from '../../components/delete-monster-confirmation-dialog/delete-monster-confirmation-dialog.component';

@Component({
  selector: 'app-monster',
  imports: [ReactiveFormsModule, PlayingCardComponent, MatButtonModule, MatInputModule, MatSelectModule],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css'
})
export class MonsterComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private monsterService = inject(MonsterService);
  private readonly dialog = inject(MatDialog);

  formGroup = this.fb.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    type: [MonsterType.ELECTRIC, [Validators.required]],
    hp: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
    figCaption: ['', [Validators.required]],
    attackName: ['', [Validators.required]],
    attackStrength: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
    attackDescription: ['', [Validators.required]]
  });

  monster: Monster = Object.assign(new Monster(), this.formGroup.value);

  monsterId = -1;
  monsterTypes = Object.values(MonsterType);

  private routeSubscription: Subscription | null = null;
  private formValueSubscription: Subscription | null = null;
  
  ngOnInit() : void{
    this.formValueSubscription = this.formGroup.valueChanges.subscribe(data => {
      this.monster = Object.assign(new Monster(), data);
    });

    this.routeSubscription = this.route.params.subscribe(params => {
      if(params['monster']){
        this.monsterId = parseInt(params['monster'], 10);
        const monsterFound = this.monsterService.get(this.monsterId);

        if(monsterFound){
          this.monster = monsterFound;
          this.formGroup.patchValue(this.monster);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.formValueSubscription?.unsubscribe();
  }

  next(){
    let nextId = this.monsterId || 0;

    nextId++;

    this.router.navigate(['/monster/' + nextId]);
  }

  submit(event: Event) {
    event.preventDefault();
    if(this.monsterId === -1) {
      this.monsterService.add(this.monster);  
    }
    else{
      this.monster.id = this.monsterId;
      this.monsterService.update(this.monster);
    }

    this.navigateBack();
  }

  isFieldValid(name: string) {
    const formControl = this.formGroup.get(name);
    return formControl?.invalid && (formControl.dirty || formControl.touched);
  }

  onFileChange(event: any) {
 		const reader = new FileReader();
 		if(event.target.files && event.target.files.length) {
 			const [file] = event.target.files;
 			reader.readAsDataURL(file); reader.onload = () => {
 				this.formGroup.patchValue({
 					image: reader.result as string
 				});
 			};
 		}
 	}

  navigateBack() {
    this.router.navigate(['/home']);
  }

  deleteMonster()
  {
    const dialogRef = this.dialog.open(DeleteMonsterConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(confirmation => {
      if(confirmation){
        this.monsterService.delete(this.monsterId);
        this.navigateBack();
      }
    });
  }

}

import { MonsterType } from './../../utils/monster.utils';
import { Monster } from './../../models/monster.model';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';

@Component({
  selector: 'app-monster',
  imports: [ReactiveFormsModule, PlayingCardComponent],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css'
})
export class MonsterComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

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

  monsterId = signal<number | undefined>(undefined)
  monsterTypes = Object.values(MonsterType);

  private routeSubscription: Subscription | null = null;
  private formValueSubscription: Subscription | null = null;
  
  ngOnInit() : void{
    this.formValueSubscription = this.formGroup.valueChanges.subscribe(data => {
      this.monster = Object.assign(new Monster(), data);
    });

    this.routeSubscription = this.route.params.subscribe(params => {
      this.monsterId.set(params['id'] ? parseInt(params['id']) : undefined);
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.formValueSubscription?.unsubscribe();
  }

  next(){
    let nextId = this.monsterId() || 0;

    nextId++;

    this.router.navigate(['/monster/' + nextId]);
  }

  submit(event: Event) {
    event.preventDefault();
    console.log(this.formGroup.value);
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

}

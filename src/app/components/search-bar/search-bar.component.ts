import { Component, Output, EventEmitter, Input, output, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  search = model<string>('Initial');

  //searchChange = output<string>();

  //@Output('submit') searchButtonClicked = new EventEmitter();

 searchButtonClicked = output({alias: 'submit'});

  searchClick(){
    this.searchButtonClicked.emit();
  }
}

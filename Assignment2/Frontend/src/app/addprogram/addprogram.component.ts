import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-addprogram',
  templateUrl: './addprogram.component.html',
  styleUrls: ['./addprogram.component.scss']
})
export class AddprogramComponent implements OnInit {

  value = 'Clear me';

  constructor(private route: Router) { }

  
  ngOnInit(): void {
  }

}

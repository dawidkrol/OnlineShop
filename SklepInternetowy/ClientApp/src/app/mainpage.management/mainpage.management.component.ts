import { Component, OnInit } from '@angular/core';
import { ArticleModel } from '../classes/ArticleModel';
import { MainpageManagementService } from './services/mainpage.management.service';

@Component({
  selector: 'app-mainpage.management',
  templateUrl: './mainpage.management.component.html',
  styleUrls: ['./mainpage.management.component.css']
})
export class MainpageManagementComponent implements OnInit {

  constructor(public service: MainpageManagementService) { }

  ngOnInit(): void {
  }

}

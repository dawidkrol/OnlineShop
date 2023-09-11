import { Component, Inject, OnInit } from '@angular/core';
import { CategoryManagementService } from './service/category.management.service';

@Component({
  selector: 'app-category.management',
  templateUrl: './category.management.component.html',
  styleUrls: ['./category.management.component.css']
})
export class CategoryManagementComponent implements OnInit {
  constructor(public categoryService: CategoryManagementService)
  {
    categoryService.loadCategories();
  }

  ngOnInit(): void {
  }

}

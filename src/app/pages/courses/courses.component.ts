import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseserviceService } from '../../services/courseservice.service';
import { Course } from '../../interfaces/course';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit{
  formGroupCourses: FormGroup
  courses: Course[] = []
  
  constructor(
    private formBuild: FormBuilder,
    private courseService: CourseserviceService
  ){
    this.formGroupCourses = formBuild.group({
      id: [''],
      name: ['', Validators.required],
      price: ['', Validators.required],
      active: [true],
      promotion: [''],
    })
  }
  ngOnInit(): void {
    this.getCourses()
  }

  getCourses(){
    this.courseService.getCourse().subscribe({
      next: (data: Course[]) => this.courses = data
    })
  }

  save(){
    if(this.formGroupCourses.valid){
      this.courseService.postCourse(this.formGroupCourses.value).subscribe({
        next: (data: Course) => {
          this.courses.push(data)
          this.formGroupCourses.reset()
        }
      })
    }else{
      window.alert("Formulário inválido");
    }
  }

}

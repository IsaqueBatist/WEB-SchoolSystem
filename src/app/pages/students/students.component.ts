import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/studentservice';
import { Student } from '../../interfaces/student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../interfaces/course';
import { CourseserviceService } from '../../services/courseservice.service';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  formGroupStudent: FormGroup;
  courses: Course[] = []

  constructor(
    private studentService: StudentService,
    private courseService: CourseserviceService,
    private formBuilder: FormBuilder
  ) {
    this.formGroupStudent = formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      course: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getStudents()
    this.getCourses()
  }

  save() {
    if (this.formGroupStudent.valid) {
      console.log(this.formGroupStudent.value)
      this.studentService.postStudent(this.formGroupStudent.value).subscribe({
        next: (json: Student) => {
          this.students.push(json), this.formGroupStudent.reset();
        },
      });
    }else{
      window.alert("Formulário inválido");
    }
  }

  getStudents(){
    this.studentService.getStudents().subscribe({
      next: (json: Student[]) => (this.students = json),
    });
  }

  getCourses(){
    this.courseService.getCourse().subscribe({
      next: (data: Course[]) => this.courses = data
    })
  }
}

package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Student;
import com.example.demo.repository.StudentRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/")
public class StudentController {
	
	@Autowired
	private StudentRepository studentRepository;
	
	
	@GetMapping("/students")
	@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
	public List<Student> getAllStudents(){
		return this.studentRepository.findAll();
	}
	
	@PostMapping("/students")
	@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
	public Student createStudent(@RequestBody Student student) {
		return this.studentRepository.save(student);
	}
	
	@GetMapping("/students/{id}")
	@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
		Student student = studentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Student doesn't exist with id: "+id));
		return ResponseEntity.ok(student);
	}
	
	@PutMapping("/students/{id}")
	@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student studentDetails){
		Student student = studentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Student doesn't exist with id: "+id));
		
		student.setFirstName(studentDetails.getFirstName());
		student.setLastName(studentDetails.getLastName());
		student.setUniversityYear(studentDetails.getUniversityYear());
		student.setEmailId(studentDetails.getEmailId());
		student.setAddress(studentDetails.getAddress());
		student.setDateOfBirth(studentDetails.getDateOfBirth());
		
		Student updatedStudent = studentRepository.save(student);
		return ResponseEntity.ok(updatedStudent);
	}
	
	@DeleteMapping("/students/{id}")
	@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<Map<String, Boolean>> deleteStudent(@PathVariable Long id){
		Student student = studentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Student not exist with id :" + id));
		
		studentRepository.delete(student);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}

Problem-3 
 
Employee Attendance Tracker 
 
EmployeeAttendanceTrackerApplication.java 
 
package com.example.attendance; 
 
import org.springframework.boot.SpringApplication; 
import org.springframework.boot.autoconfigure.SpringBootApplication; 
 
@SpringBootApplication 
public class EmployeeAttendanceTrackerApplication { 
    public static void main(String[] args) { 
        SpringApplication.run(EmployeeAttendanceTrackerApplication.class, args); 
    } 
} 
 
entity/Employee.java 
 
package com.example.attendance.entity; 
 
import jakarta.persistence.*; 
 
@Entity 
public class Employee { 
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long employeeId; 
 
    private String name; 
    private String department; 
    private String designation; 
 
    // Getters and Setters 
} 
 
entity/Attendance.java 
 
package com.example.attendance.entity; 
 
import jakarta.persistence.*; 
import java.time.LocalDate; 
 
@Entity 
public class Attendance { 
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long attendanceId; 
 
    @ManyToOne 
    private Employee employee; 
 
    private LocalDate date; 
    private String status; // Present or Absent 
 
    // Getters and Setters 
} 
 
package com.example.attendance.entity; 
 
import jakarta.persistence.*; 
import java.time.LocalDate; 
 
@Entity 
public class Attendance { 
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long attendanceId; 
 
    @ManyToOne 
    private Employee employee; 
 
    private LocalDate date; 
    private String status; // Present or Absent 
 
    // Getters and Setters 
} 
 
 
repository/EmployeeRepository.java 
 
package com.example.attendance.repository; 
 
import com.example.attendance.entity.Employee; 
import org.springframework.data.jpa.repository.JpaRepository; 
 
public interface EmployeeRepository extends JpaRepository<Employee, Long> { 
} 
 
 
repository/AttendanceRepository.java 
 
package com.example.attendance.repository; 
 
import com.example.attendance.entity.Attendance; 
import com.example.attendance.entity.Employee; 
import org.springframework.data.jpa.repository.JpaRepository; 
import java.time.LocalDate; 
import java.util.List; 
 
public interface AttendanceRepository extends JpaRepository<Attendance, Long> { 
    List<Attendance> findByEmployee(Employee employee); 
    List<Attendance> findByDate(LocalDate date); 
} 
 
 
config/SecurityConfig.java 
 
package com.example.attendance.config; 
 
import org.springframework.context.annotation.Bean; 
import org.springframework.context.annotation.Configuration; 
import org.springframework.security.config.annotation.web.builders.HttpSecurity; 
import org.springframework.security.web.SecurityFilterChain; 
 
@Configuration 
public class SecurityConfig { 
    @Bean 
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception { 
        http 
            .authorizeHttpRequests(auth -> auth 
                .requestMatchers("/api/reports/**").hasRole("MANAGER") 
                .requestMatchers("/api/attendance/**").hasAnyRole("EMPLOYEE", "MANAGER") 
                .anyRequest().authenticated() 
            ).formLogin() 
            .and() 
            .httpBasic(); 
        return http.build(); 
    } 
} 
 
 
resources/application.properties 
 
spring.datasource.url=jdbc:postgresql://localhost:5432/attendance_db 
spring.datasource.username=postgres 
spring.datasource.password=yourpassword 
spring.jpa.hibernate.ddl-auto=update 
spring.jpa.show-sql=true 
spring.sql.init.mode=always

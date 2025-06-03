# Employee-Attendance-Tracker
Problem Statement:  Employee Attendance Tracker Develop an application to track employee attendance within an organization. The system should allow employees to mark attendance and managers to view attendance reports.

## Objectives:
To create a reliable attendance tracking system.
To enable employees to mark daily attendance.
To provide managers with detailed attendance reports.
To manage employee data securely with role-based access.

## Requirements:
Employee entity with fields: employeeId, name, department, designation.
Attendance entity with fields: attendanceId, employeeId, date, status (Present/Absent).
Ability to mark attendance daily.
Reports showing attendance summary per employee and department.
Use PostgreSQL for data persistence.
Implement Spring Security to restrict attendance marking and report viewing.
Provide a simple UI or REST API endpoints for functionalities.

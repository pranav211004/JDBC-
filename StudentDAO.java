package dao;
import java.sql.*;
import model.Student;

public class StudentDAO {
    private Connection con;

    public StudentDAO() throws SQLException {
        con = DriverManager.getConnection("jdbc:mysql://localhost:3306/testdb", "root", "yourpassword");
    }

    public void addStudent(Student s) throws SQLException {
        PreparedStatement ps = con.prepareStatement("INSERT INTO student VALUES(?,?,?)");
        ps.setInt(1, s.getId());
        ps.setString(2, s.getName());
        ps.setInt(3, s.getAge());
        ps.executeUpdate();
    }

    public void viewStudents() throws SQLException {
        ResultSet rs = con.createStatement().executeQuery("SELECT * FROM student");
        while (rs.next())
            System.out.println(rs.getInt(1) + " " + rs.getString(2) + " " + rs.getInt(3));
    }
}

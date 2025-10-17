import java.sql.*;
import java.util.Scanner;

public class ProductCRUD {
    static final String URL = "jdbc:mysql://localhost:3306/testdb";
    static final String USER = "root";
    static final String PASS = "yourpassword";

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        try (Connection con = DriverManager.getConnection(URL, USER, PASS)) {
            while (true) {
                System.out.println("\n1. Add  2. View  3. Update  4. Delete  5. Exit");
                int choice = sc.nextInt();
                sc.nextLine();

                switch (choice) {
                    case 1:
                        System.out.print("Enter name: ");
                        String name = sc.nextLine();
                        System.out.print("Enter price: ");
                        double price = sc.nextDouble();
                        PreparedStatement ps1 = con.prepareStatement("INSERT INTO product(name, price) VALUES(?,?)");
                        ps1.setString(1, name);
                        ps1.setDouble(2, price);
                        ps1.executeUpdate();
                        System.out.println("Product Added!");
                        break;

                    case 2:
                        ResultSet rs = con.createStatement().executeQuery("SELECT * FROM product");
                        while (rs.next())
                            System.out.println(rs.getInt("id") + " " + rs.getString("name") + " " + rs.getDouble("price"));
                        break;

                    case 3:
                        System.out.print("Enter Product ID: ");
                        int id = sc.nextInt();
                        System.out.print("Enter New Price: ");
                        double newPrice = sc.nextDouble();
                        PreparedStatement ps2 = con.prepareStatement("UPDATE product SET price=? WHERE id=?");
                        ps2.setDouble(1, newPrice);
                        ps2.setInt(2, id);
                        ps2.executeUpdate();
                        System.out.println("Product Updated!");
                        break;

                    case 4:
                        System.out.print("Enter Product ID: ");
                        int delId = sc.nextInt();
                        PreparedStatement ps3 = con.prepareStatement("DELETE FROM product WHERE id=?");
                        ps3.setInt(1, delId);
                        ps3.executeUpdate();
                        System.out.println("Product Deleted!");
                        break;

                    case 5:
                        System.exit(0);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

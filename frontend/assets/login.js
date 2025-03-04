document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Username และ Password ที่กำหนดไว้ล่วงหน้า
    const employees = [
        { username: "admin", password: "123456" },
        { username: "staff1", password: "password1" },
        { username: "staff2", password: "password2" }
    ];

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let errorMessage = document.getElementById("error-message");

    // ตรวจสอบข้อมูล
    let user = employees.find(emp => emp.username === username && emp.password === password);
    
    if (user) {
        // Login สำเร็จ -> Redirect ไปยังหน้าพนักงาน
        window.location.href = "dashboard.html";
    } else {
        // แสดง Error Message
        errorMessage.textContent = "Username หรือ Password ไม่ถูกต้อง!";
    }
});

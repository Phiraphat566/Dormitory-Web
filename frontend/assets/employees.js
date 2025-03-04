document.addEventListener("DOMContentLoaded", async function () {
    const employeeList = document.getElementById("employee-list");
    const editModeBtn = document.getElementById("edit-mode-btn");
    const addEmployeeBtn = document.getElementById("add-employee-btn");

    let employees = [];
    let editMode = false;

    // ✅ ดึงข้อมูลพนักงานจาก API
    async function fetchEmployees() {
        try {
            const response = await fetch("http://localhost:3000/api/v1/employees");
            employees = await response.json();
            console.log("📌 ข้อมูลพนักงานที่ได้รับจาก API:", employees);
            displayEmployees();
        } catch (error) {
            console.error("❌ Error fetching employees:", error);
        }
    }

    // ✅ แสดงข้อมูลพนักงาน
    function displayEmployees() {
        employeeList.innerHTML = "";

        employees.forEach((employee, index) => {
            const fullName = `${employee.first_name || "ไม่ระบุ"} ${employee.last_name || ""}`;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${fullName}</td>
                <td>${employee.Address || "ไม่ระบุ"}</td>
                <td>${employee.position || "ไม่ระบุ"}</td>
                <td>${employee.salary ? employee.salary.toLocaleString() + " บาท" : "ไม่ระบุ"}</td>
                <td class="edit-column">
                    ${editMode ? `
                        <button class="edit-btn" data-index="${index}">✏️</button>
                        <button class="delete-btn" data-id="${employee.Officer_ID}">🗑️</button>
                    ` : ""}
                </td>
            `;
            employeeList.appendChild(row);
        });

        setupEventListeners();
    }

    // ✅ ตั้งค่าปุ่มแก้ไขและลบ
    function setupEventListeners() {
        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.dataset.index;
                editEmployee(index);
            });
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", async function () {
                const employeeId = this.dataset.id;
                if (confirm("คุณต้องการลบพนักงานนี้ใช่หรือไม่?")) {
                    await deleteEmployee(employeeId);
                }
            });
        });
    }

    // ✅ เพิ่มพนักงานใหม่
    async function addEmployee() {
        const firstName = prompt("ชื่อพนักงาน:");
        const lastName = prompt("นามสกุลพนักงาน:");
        const address = prompt("ที่อยู่พนักงาน:");
        const position = prompt("ตำแหน่ง:");
        const salary = prompt("เงินเดือน:");

        if (firstName && lastName && address && position && salary) {
            const newEmployee = {
                first_name: firstName,
                last_name: lastName,
                Address: address,
                position: position,
                salary: parseInt(salary),
            };

            try {
                const response = await fetch("http://localhost:3000/api/v1/employees", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newEmployee),
                });

                if (response.ok) {
                    fetchEmployees(); // โหลดข้อมูลใหม่
                } else {
                    console.error("❌ Error adding employee");
                }
            } catch (error) {
                console.error("❌ Error adding employee:", error);
            }
        }
    }

    // ✅ แก้ไขข้อมูลพนักงาน
    async function editEmployee(index) {
        const employee = employees[index];
        const newFirstName = prompt("ชื่อ:", employee.first_name || "");
        const newLastName = prompt("นามสกุล:", employee.last_name || "");
        const newAddress = prompt("ที่อยู่:", employee.Address || "");
        const newPosition = prompt("ตำแหน่ง:", employee.position || "");
        const newSalary = prompt("เงินเดือน:", employee.salary || "");

        if (newFirstName && newLastName && newAddress && newPosition && newSalary) {
            const updatedEmployee = {
                first_name: newFirstName,
                last_name: newLastName,
                Address: newAddress,
                position: newPosition,
                salary: parseInt(newSalary),
            };

            try {
                const response = await fetch(`http://localhost:3000/api/v1/employees/${employee.Officer_ID}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedEmployee),
                });

                if (response.ok) {
                    fetchEmployees(); // โหลดข้อมูลใหม่
                } else {
                    console.error("❌ Error updating employee");
                }
            } catch (error) {
                console.error("❌ Error updating employee:", error);
            }
        }
    }

    // ✅ ลบข้อมูลพนักงาน
    async function deleteEmployee(id) {
        try {
            await fetch(`http://localhost:3000/api/v1/employees/${id}`, { method: "DELETE" });
            fetchEmployees(); // โหลดข้อมูลใหม่
        } catch (error) {
            console.error("❌ Error deleting employee:", error);
        }
    }

    // ✅ เปิด/ปิดโหมดแก้ไข
    editModeBtn.addEventListener("click", function () {
        editMode = !editMode;
        editModeBtn.innerText = editMode ? "🔄 ปิดโหมดแก้ไข" : "🔄 แก้ไข";
        displayEmployees();
    });

    // ✅ ตั้งค่าปุ่มเพิ่มพนักงาน
    addEmployeeBtn.addEventListener("click", addEmployee);

    // ✅ โหลดข้อมูลพนักงานครั้งแรก
    fetchEmployees();
});

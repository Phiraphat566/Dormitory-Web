document.addEventListener("DOMContentLoaded", function () {
    const roomList = document.getElementById("room-list");
    const filters = document.querySelectorAll(".filter");
    const pagination = document.querySelector(".pagination");

    let roomsData = [];
    let currentPage = 1;
    const rowsPerPage = 10;

    // ดึงข้อมูลจาก API
    async function fetchRooms(filter = "all") {
        const response = await fetch("http://localhost:3000/api/v1/rooms");
        const rooms = await response.json();

        // กรองข้อมูลตามตัวกรอง
        roomsData = rooms.filter(room => {
            if (filter === "available") return room.status === "ว่าง";
            if (filter === "occupied") return room.status === "ไม่ว่าง";
            return true;
        });

        currentPage = 1;
        displayRooms();
        setupPagination();
    }

    // แสดงข้อมูลตามหน้าปัจจุบัน
    function displayRooms() {
        roomList.innerHTML = "";
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedRooms = roomsData.slice(start, end);

        paginatedRooms.forEach(room => {
            const row = `
                <tr>
                    <td>${room.Room_ID}</td>
                    <td style="color: ${room.status === "ว่าง" ? "green" : "red"}">${room.status}</td>
                    <td>${room.Number_of_tenants || "-"}</td>
                </tr>
            `;
            roomList.innerHTML += row;
        });
    }

    // สร้าง Pagination
    function setupPagination() {
        pagination.innerHTML = "";
        const pageCount = Math.ceil(roomsData.length / rowsPerPage);

        // ปุ่มย้อนกลับ
        if (currentPage > 1) {
            pagination.innerHTML += `<span class="page prev">◀</span>`;
        }

        // ปุ่มหมายเลขหน้า
        for (let i = 1; i <= pageCount; i++) {
            pagination.innerHTML += `<span class="page ${i === currentPage ? "active" : ""}">${i}</span>`;
        }

        // ปุ่มถัดไป
        if (currentPage < pageCount) {
            pagination.innerHTML += `<span class="page next">▶</span>`;
        }

        // เพิ่ม event ให้กับปุ่ม pagination
        document.querySelectorAll(".page").forEach(page => {
            page.addEventListener("click", function () {
                if (this.classList.contains("prev")) {
                    currentPage--;
                } else if (this.classList.contains("next")) {
                    currentPage++;
                } else {
                    currentPage = parseInt(this.innerText);
                }
                displayRooms();
                setupPagination();
            });
        });
    }

    // เปลี่ยนตัวกรอง
    filters.forEach(filter => {
        filter.addEventListener("click", function () {
            filters.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            fetchRooms(this.dataset.filter);
        });
    });

    // โหลดข้อมูลครั้งแรก
    fetchRooms();
});

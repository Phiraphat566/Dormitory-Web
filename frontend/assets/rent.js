document.addEventListener("DOMContentLoaded", async function () {
    const waterList = document.getElementById("water-list");
    const filters = document.querySelectorAll(".filter");
    const pagination = document.querySelector(".pagination");

    let waterData = [];
    let roomData = {}; // เก็บ Room_ID ตาม Tenant_ID
    let currentPage = 1;
    const rowsPerPage = 10;

    // ✅ ดึงข้อมูลห้องพัก
    async function fetchRooms() {
        try {
            const response = await fetch("http://localhost:3000/api/v1/tenants");
            const tenants = await response.json();
            console.log("🔍 ข้อมูลผู้เช่า:", tenants);

            tenants.forEach(tenant => {
                roomData[tenant.Tenant_ID] = tenant.Room_ID || "ไม่ระบุ";
            });

            console.log("📌 roomData:", roomData);
        } catch (error) {
            console.error("❌ Error fetching room data:", error);
        }
    }

    // ✅ ดึงข้อมูลค่าน้ำ
    async function fetchWaterData(filter = "all") {
        try {
            await fetchRooms(); // โหลดข้อมูลห้องก่อน

            const response = await fetch("http://localhost:3000/api/v1/bills/rent");
            let data = await response.json();
            console.log("💧 ค่าเช่าที่โหลดมา:", data);

            // 🔹 กรองข้อมูลตามสถานะ
            waterData = data.filter(entry => {
                if (filter === "unpaid") return entry.status === "ยังไม่ได้ชำระ";
                if (filter === "paid") return entry.status === "ชำระแล้ว";
                if (filter === "due") return entry.status === "ใกล้ชำระแล้ว";
                return true;
            });

            currentPage = 1;
            displayWater();
            setupPagination();
        } catch (error) {
            console.error("❌ Error fetching water data:", error);
        }
    }

    // ✅ แสดงข้อมูลในตาราง
    function displayWater() {
        waterList.innerHTML = "";
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedData = waterData.slice(start, end);

        paginatedData.forEach(entry => {
            const roomNumber = roomData[entry.tenant_id] || "ไม่ระบุ";
            const isPaid = entry.status === "ชำระแล้ว";

            console.log(`📌 Tenant ${entry.tenant_id}: ห้อง ${roomNumber}`);

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${roomNumber}</td>
                <td>${entry.price || "-"}</td>
                <td class="status ${isPaid ? "paid" : entry.status === "ยังไม่ได้ชำระ" ? "unpaid" : "due"}">
                    ${entry.status}
                </td>
                <td>
                    <button class="check-btn ${isPaid ? "approved" : "warning"}" 
                        data-room="${roomNumber}" 
                        data-proof="${entry.proof_of_payment}">
                        ${isPaid ? "ตรวจสอบ" : "ส่งแจ้งเตือน"}
                    </button>
                </td>
            `;

            waterList.appendChild(row);
        });

        setupCheckButtons();
    }

    // ✅ ตั้งค่าการแบ่งหน้า
    function setupPagination() {
        pagination.innerHTML = "";
        const pageCount = Math.ceil(waterData.length / rowsPerPage);

        if (currentPage > 1) {
            pagination.innerHTML += `<span class="page prev">◀</span>`;
        }

        for (let i = 1; i <= pageCount; i++) {
            pagination.innerHTML += `<span class="page ${i === currentPage ? "active" : ""}">${i}</span>`;
        }

        if (currentPage < pageCount) {
            pagination.innerHTML += `<span class="page next">▶</span>`;
        }

        document.querySelectorAll(".page").forEach(page => {
            page.addEventListener("click", function () {
                if (this.classList.contains("prev")) {
                    currentPage--;
                } else if (this.classList.contains("next")) {
                    currentPage++;
                } else {
                    currentPage = parseInt(this.innerText);
                }
                displayWater();
                setupPagination();
            });
        });
    }

    // ✅ ตั้งค่าปุ่มตรวจสอบ & แจ้งเตือน
    function setupCheckButtons() {
        document.querySelectorAll(".check-btn").forEach(button => {
            button.addEventListener("click", function () {
                const roomNumber = this.dataset.room;
                const proofLink = this.dataset.proof;
    
                if (this.innerText === "ส่งแจ้งเตือน") {
                    alert(`📢 ส่งแจ้งเตือนห้อง ${roomNumber} สำเร็จ!`);
                } else {
                    // ✅ ส่ง room_id และ proof_of_payment ไปที่หน้า payment-proof.html
                    window.location.href = `payment-proof.html?room=${roomNumber}&proof=${encodeURIComponent(proofLink)}`;
                }
            });
        });
    }

    // ✅ ตัวกรองข้อมูล
    filters.forEach(filter => {
        filter.addEventListener("click", function () {
            filters.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            fetchWaterData(this.dataset.filter);
        });
    });

    // ✅ โหลดข้อมูลครั้งแรก
    fetchWaterData();
});

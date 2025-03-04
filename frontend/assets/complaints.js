document.addEventListener("DOMContentLoaded", async function () {
    const complaintsList = document.getElementById("complaints-list");

    async function fetchComplaints() {
        try {
            const response = await fetch("http://localhost:3000/api/v1/complaints");
            const complaints = await response.json();
            console.log("📌 คำร้องที่ได้รับจาก API:", complaints);

            complaintsList.innerHTML = ""; // เคลียร์ข้อมูลในตาราง

            complaints.forEach(complaint => {
                const tenantName = complaint.tenant_name || "ไม่ระบุ"; // ✅ ใช้ชื่อผู้เช่า
                const roomNumber = complaint.room_number || "ไม่ระบุ"; // ✅ หมายเลขห้อง
                const complaintType = complaint.type || "ไม่ระบุ"; // ✅ ประเภทคำร้อง
                const complaintDetail = complaint.detail || "ไม่ระบุ"; // ✅ รายละเอียด
                const status = complaint.status || "ไม่ระบุ"; // ✅ สถานะ

                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${roomNumber}</td>
                    <td>${tenantName}</td>
                    <td>${complaintType}</td>
                    <td>${complaintDetail}</td>
                    <td>${status}</td>
                    <td>
                        <button class="detail-btn" data-id="${complaint.id}" data-type="${complaint.type}">รายละเอียด</button>
                    </td>
                `;
                complaintsList.appendChild(row);
            });

            // เมื่อคลิกปุ่ม "รายละเอียด"
            document.querySelectorAll(".detail-btn").forEach(button => {
                button.addEventListener("click", function () {
                    const complaintId = this.dataset.id; // รับค่า complaint ID
                    const complaintType = this.dataset.type; // รับประเภทคำร้อง

                    let redirectUrl = "";
                    if (complaintType === "คำร้องขอเลี้ยงสัตว์") {
                        // ไปยังไฟล์ complaint-asking-for-pets.html
                        redirectUrl = `complaint-asking-for-pets.html?id=${complaintId}`;
                    } else if (complaintType === "คำร้องขออยู่เกินกำหนด") {
                        // ไปยังไฟล์ complaint-request-to-overstay.html
                        redirectUrl = `complaint-request-to-overstay.html?id=${complaintId}`;
                    } else {
                        // ไปยังไฟล์ complaint-general.html
                        redirectUrl = `complaint-general.html?id=${complaintId}`;
                    }

                    // นำทางไปยังหน้าที่ตรงกับประเภทคำร้อง
                    window.location.href = redirectUrl;
                });
            });

        } catch (error) {
            console.error("❌ Error fetching complaints:", error);
        }
    }

    fetchComplaints();
});

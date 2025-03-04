document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const complaintId = urlParams.get("id");

    if (!complaintId) {
        alert("ไม่พบคำร้อง");
        window.location.href = "complaints.html";
        return;
    }

    async function fetchGeneralComplaint() {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/complaints/${complaintId}`);
            const complaint = await response.json();

            if (!complaint) {
                alert("ไม่พบข้อมูลคำร้อง");
                return;
            }

            console.log("📌 คำร้องทั่วไปที่ได้รับจาก API:", complaint);

            // แสดงข้อมูลของคำร้องทั่วไป
            document.getElementById("gen-tenant-name").value = complaint.tenants?.Ten_name || "ไม่ระบุ";
            document.getElementById("gen-room-number").value = complaint.tenants?.Room_ID || "ไม่ระบุ";
            document.getElementById("gen-complaint-detail").value = complaint.Complaint_Detail || "ไม่ระบุ";

            // เพิ่มข้อมูลประเภทคำร้อง
            document.getElementById("gen-complaint-type").innerHTML = `
                <label>ประเภทของคำร้อง</label>
                <input type="text" value="${complaint.Complaint_type}" disabled>
            `;

            // ฟังก์ชันแสดงข้อความแจ้งเตือน
            function showStatusUpdateMessage(status) {
                alert(`อัพเดทสถานะเรียบร้อยแล้ว: ${status}`);
            }

            // เพิ่ม event listeners สำหรับปุ่มสถานะ
            const pendingBtn = document.querySelector(".pending");
            const completedBtn = document.querySelector(".completed");

            // เมื่อกดปุ่ม "กำลังดำเนินการ"
            pendingBtn.addEventListener("click", function () {
                showStatusUpdateMessage("กำลังดำเนินการ");
            });

            // เมื่อกดปุ่ม "ดำเนินการแล้ว"
            completedBtn.addEventListener("click", function () {
                showStatusUpdateMessage("ดำเนินการแล้ว");
            });

        } catch (error) {
            console.error("❌ Error fetching general complaint:", error);
            alert("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        }
    }

    fetchGeneralComplaint();
});

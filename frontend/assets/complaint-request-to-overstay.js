document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const complaintId = urlParams.get("id");

    if (!complaintId) {
        alert("ไม่พบคำร้อง");
        window.location.href = "complaints.html";
        return;
    }

    async function fetchOverstayComplaint() {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/complaints/${complaintId}`);
            const complaint = await response.json();

            if (!complaint) {
                alert("ไม่พบข้อมูลคำร้อง");
                return;
            }

            console.log("📌 คำร้องขออยู่เกินกำหนดที่ได้รับจาก API:", complaint);

            // ดึงข้อมูลจาก API ตรงๆ
            document.getElementById("over-tenant-name").value = complaint.tenant_name || "ไม่ระบุ";
            document.getElementById("over-room-number").value = complaint.room_number || "ไม่ระบุ";
            document.getElementById("over-old-end-date").value = complaint.old_contract_end || "ไม่ระบุ";
            document.getElementById("over-extension").value = complaint.detail || "ไม่ระบุ";
            document.getElementById("over-new-end-date").value = complaint.new_contract_end || "ไม่ระบุ";
            document.getElementById("over-reason").value = complaint.detail || "ไม่ระบุ"; // หรือใช้ `detail`

        } catch (error) {
            console.error("❌ Error fetching overstay complaint:", error);
            alert("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        }
    }

    fetchOverstayComplaint();
});

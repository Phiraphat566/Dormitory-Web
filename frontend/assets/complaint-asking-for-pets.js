document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const complaintId = urlParams.get("id");

    if (!complaintId) {
        alert("ไม่พบคำร้อง");
        window.location.href = "complaints.html";
        return;
    }

    async function fetchPetComplaint() {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/complaints/${complaintId}`);
            const complaint = await response.json();

            if (!complaint) {
                alert("ไม่พบข้อมูลคำร้อง");
                return;
            }

            // ตรวจสอบข้อมูลจาก API
            console.log("📌 คำร้องขอเลี้ยงสัตว์ที่ได้รับจาก API:", complaint);

            // ดึงข้อมูลจากฟิลด์ 'tenant_name' และ 'room_number' ตรงๆ
            document.getElementById("pet-tenant-name").value = complaint.tenant_name || "ไม่ระบุ";
            document.getElementById("pet-room-number").value = complaint.room_number || "ไม่ระบุ";

            // ดึงข้อมูลจาก 'detail' โดยแยกเอาสายพันธุ์มาใช้
            const detail = complaint.detail || "";
            const petBreed = detail.match(/สายพันธุ์:\s*(\S+)/);  // หาสายพันธุ์จากข้อความ
            document.getElementById("pet-breed").value = petBreed ? petBreed[1] : "ไม่ระบุ";  // แสดงสายพันธุ์

            // ดึงข้อมูลอื่นๆ ตรงๆ
            document.getElementById("pet-type").value = complaint.pet_type || "ไม่ระบุ";
            document.getElementById("pet-count").value = complaint.pet_count || "ไม่ระบุ";
            document.getElementById("pet-additional").value = complaint.complaintAP_detail || "ไม่ระบุ"; 

        } catch (error) {
            console.error("❌ Error fetching pet complaint:", error);
            alert("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        }
    }

    fetchPetComplaint();
});

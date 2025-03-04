document.addEventListener("DOMContentLoaded", function () {
    const actionDropdown = document.getElementById("tenant-action");
    const actionTitle = document.getElementById("action-title");
    const confirmButton = document.querySelector(".confirm");
    const cancelButton = document.querySelector(".cancel");
    const formFields = document.querySelector(".tenant-form");

    const roomInput = document.getElementById("room-number");
    const tenantName = document.getElementById("tenant-name");
    const contractPeriod = document.getElementById("contract-period");
    const tenantCount = document.getElementById("tenant-count");
    const startDate = document.getElementById("start-date");
    const endDate = document.getElementById("end-date");
    const contactInfo = document.getElementById("contact-info");
    const roomWarning = document.querySelector(".room-warning");

    function updateForm(action) {
        if (action === "add") {
            actionTitle.innerText = "เพิ่มผู้พักอาศัย";
            confirmButton.innerText = "ยืนยัน";
            confirmButton.style.backgroundColor = "#28a745";
            formFields.style.display = "grid";
        } else if (action === "edit") {
            actionTitle.innerText = "แก้ไขข้อมูลผู้พักอาศัย";
            confirmButton.innerText = "ยืนยัน";
            confirmButton.style.backgroundColor = "#28a745";
            formFields.style.display = "grid";
        } else if (action === "delete") {
            actionTitle.innerText = "ลบผู้พักอาศัย";
            confirmButton.innerText = "ลบ";
            confirmButton.style.backgroundColor = "#dc3545";
            formFields.style.display = "none";
        }
    }

    actionDropdown.addEventListener("change", function () {
        updateForm(this.value);
    });

    cancelButton.addEventListener("click", function () {
        alert("ยกเลิกการดำเนินการ");
    });

    confirmButton.addEventListener("click", function () {
        if (actionDropdown.value === "delete") {
            alert("ลบข้อมูลผู้เช่าสำเร็จ!");
        } else {
            alert("บันทึกข้อมูลผู้เช่าสำเร็จ!");
        }
    });

    // 🔍 ดึงข้อมูลติดต่อจาก contact_tenant
    async function fetchContactInfo(contactId) {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/contact_tenant/${contactId}`);
            if (!response.ok) {
                throw new Error("ไม่พบข้อมูลติดต่อ");
            }
            const contactData = await response.json();
            console.log("✅ Contact Data:", contactData); 
            return `${contactData.Phone} / ${contactData.Gmail}`;
        } catch (error) {
            console.error("❌ Error fetching contact info:", error);
            return "ไม่มีข้อมูลติดต่อ";
        }
    }

    // 🔍 ดึงข้อมูลห้องพัก
    async function fetchRoomData() {
        const roomId = roomInput.value.trim();
        if (roomId === "") {
            roomWarning.style.display = "block";
            roomWarning.innerText = "กรอกหมายเลขห้องพัก";
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:3000/api/v1/rooms/${roomId}`);
            if (!response.ok) {
                throw new Error("ไม่พบหมายเลขห้องนี้");
            }
    
            const data = await response.json();
            console.log("✅ Room Data:", data); 
    
            // ✅ ตรวจสอบค่าที่ดึงมาและรองรับหลายรูปแบบ
            contractPeriod.value = data.Contract_period ?? data.contract_period ?? "";  
            tenantCount.value = data.Number_of_tenants ?? data.number_of_tenants ?? ""; 
            startDate.value = data.Start_date_of_stay ? data.Start_date_of_stay.split("T")[0] : "";
            endDate.value = data.Contract_end_date ? data.Contract_end_date.split("T")[0] : "";

            // ✅ ดึงข้อมูลผู้เช่า
            if (data.Tenant_ID) {
                const tenantResponse = await fetch(`http://localhost:3000/api/v1/tenants/${data.Tenant_ID}`);
                if (tenantResponse.ok) {
                    const tenantData = await tenantResponse.json();
                    console.log("✅ Tenant Data:", tenantData);
                    tenantName.value = tenantData.Ten_name || "";

                    // ✅ ดึงข้อมูลติดต่อ
                    if (tenantData.Contact_T_ID) {
                        contactInfo.value = "กำลังโหลด...";
                        contactInfo.value = await fetchContactInfo(tenantData.Contact_T_ID);
                    } else {
                        contactInfo.value = "ไม่มีข้อมูล";
                    }
                } else {
                    console.error("❌ ไม่พบข้อมูลผู้เช่า");
                    tenantName.value = "";
                    contactInfo.value = "ไม่มีข้อมูล";
                }
            } else {
                console.error("❌ ไม่พบ Tenant_ID ในข้อมูลห้องพัก");
                tenantName.value = "";
                contactInfo.value = "ไม่มีข้อมูล";
            }
    
            roomWarning.style.display = "none"; // ซ่อนข้อความแจ้งเตือน
        } catch (error) {
            console.error("❌ Error fetching room data:", error);
            roomWarning.style.display = "block";
            roomWarning.innerText = "ไม่พบข้อมูลห้องพัก";
        }
    }

    // ✅ เพิ่ม event listener ให้ดึงข้อมูลอัตโนมัติเมื่อกรอกหมายเลขห้อง
    roomInput.addEventListener("input", fetchRoomData);

    updateForm(actionDropdown.value);
});

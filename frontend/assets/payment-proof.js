document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const tenantId = urlParams.get("tenant_id");

    if (!tenantId) {
        alert("ไม่พบข้อมูลผู้เช่า!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/v1/payment-proof/${tenantId}`);
        const data = await response.json();

        if (data.error) {
            document.getElementById("room-number").innerText = "ห้อง -";
            document.getElementById("proof-image").alt = "ไม่มีหลักฐานการชำระเงิน";
            return;
        }

        // อัปเดตข้อมูลในหน้าเว็บ
        document.getElementById("room-number").innerText = `ห้อง ${data.room_id}`;
        document.getElementById("proof-image").src = data.proof_of_payment;

    } catch (error) {
        console.error("Error fetching payment proof:", error);
        alert("เกิดข้อผิดพลาดในการโหลดข้อมูล!");
    }
});

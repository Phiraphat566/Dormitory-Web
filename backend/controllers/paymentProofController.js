const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ดึงข้อมูลหลักฐานการชำระเงินจาก Rent Bill ตาม Tenant ID หรือ Rent ID
const getPaymentProof = async (req, res) => {
    const { id } = req.params; // รับ ID จาก URL

    try {
        // ค้นหาข้อมูลจากตาราง rent_bill โดยเชื่อมโยง Tenant_ID หรือ Rent_ID
        const rentBill = await prisma.rent_bill.findFirst({
            where: {
                OR: [
                    { Rent_ID: parseInt(id) }, // ค้นหาด้วย Rent_ID
                    { Tenant_ID: parseInt(id) } // ค้นหาด้วย Tenant_ID
                ]
            },
            select: {
                Rent_ID: true,
                Tenant_ID: true,
                Proof_of_payment: true
            }
        });

        // ถ้าไม่พบข้อมูล
        if (!rentBill) {
            return res.status(404).json({ message: "ไม่พบหลักฐานการชำระเงิน" });
        }

        // ส่งข้อมูลกลับ
        res.json({
            rent_id: rentBill.Rent_ID,
            tenant_id: rentBill.Tenant_ID,
            proof_of_payment: rentBill.Proof_of_payment
        });

    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลหลักฐานการชำระเงิน:", error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
    }
};

module.exports = { getPaymentProof };

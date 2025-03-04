const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getContactTenantById = async (req, res) => {
    try {
        const contactId = req.params.id; // รับค่าจาก URL

        // ดึงข้อมูลจากฐานข้อมูล
        const contact = await prisma.contact_tenant.findUnique({
            where: {
                Contact_T_ID: contactId,
            },
        });

        if (!contact) {
            return res.status(404).json({ message: "ไม่พบข้อมูลผู้ติดต่อ" });
        }

        res.json(contact);
    } catch (error) {
        console.error("Error fetching contact_tenant:", error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
    }
};

// ✅ ตรวจสอบว่ามีการ export ฟังก์ชัน
module.exports = { getContactTenantById };

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ดึงข้อมูลค่าน้ำทั้งหมด
exports.getWaterBills = async (req, res) => {
    try {
        const bills = await prisma.water_bill.findMany({
            include: {
                tenants: { select: { Room_ID: true } }
            }
        });

        const response = bills.map(bill => ({
            tenant_id: bill.Tenant_ID,
            room_id: bill.tenants?.Room_ID || "ไม่ระบุ",
            price: bill.Price,
            status: bill.status,
            proof_of_payment: bill.Proof_of_payment ? bill.Proof_of_payment.toString() : null
        }));

        res.json(response);
    } catch (error) {
        console.error(" Error fetching water bills:", error);
        res.status(500).json({ error: "Error fetching water bills", details: error.message });
    }
};

//  ดึงข้อมูลค่าน้ำตาม Tenant ID
exports.getWaterBillByTenant = async (req, res) => {
    const { tenant_id } = req.params;

    try {
        const bill = await prisma.water_bill.findFirst({
            where: { Tenant_ID: parseInt(tenant_id) },
            include: {
                tenants: { select: { Room_ID: true } }
            }
        });

        if (!bill) return res.status(404).json({ error: "Bill not found" });

        res.json({
            tenant_id: bill.Tenant_ID,
            room_id: bill.tenants?.Room_ID || "ไม่ระบุ",
            price: bill.Price,
            status: bill.status,
            proof_of_payment: bill.Proof_of_payment ? bill.Proof_of_payment.toString() : null
        });
    } catch (error) {
        console.error(" Error fetching water bill:", error);
        res.status(500).json({ error: "Error fetching water bill", details: error.message });
    }
};

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ✅ ดึงข้อมูลค่าห้องทั้งหมด
exports.getRentBills = async (req, res) => {
    try {
        const bills = await prisma.rent_bill.findMany({
            include: {
                tenants: { select: { Room_ID: true } } // ✅ เชื่อมกับ tenants เพื่อดึง Room_ID
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
        console.error("❌ Error fetching rent bills:", error);
        res.status(500).json({ error: "Error fetching rent bills", details: error.message });
    }
};

// ✅ ดึงข้อมูลค่าห้องตาม Tenant ID
exports.getRentBillByTenant = async (req, res) => {
    const { tenant_id } = req.params;

    try {
        const bill = await prisma.rent_bill.findFirst({
            where: { Tenant_ID: parseInt(tenant_id) },
            include: {
                tenants: { select: { Room_ID: true } } // ✅ ดึง Room_ID จาก tenants
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
        console.error("❌ Error fetching rent bill:", error);
        res.status(500).json({ error: "Error fetching rent bill", details: error.message });
    }
};

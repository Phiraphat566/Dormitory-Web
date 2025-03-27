const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// สร้าง Tenant ใหม่
const createTenant = async (req, res) => {
    const { Ten_name, Address, Room_ID, Contact_T_ID } = req.body;

    try {
        const tenant = await prisma.tenants.create({
            data: { Ten_name, Address, Room_ID, Contact_T_ID }
        });

        res.status(201).json({
            status: "ok",
            message: `Tenant with ID = ${tenant.Tenant_ID} is created`,
            tenant
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to create tenant",
            error: error.message
        });
    }
};

//  ดึงข้อมูล Tenant ทั้งหมด
const getTenants = async (req, res) => {
    try {
        const tenants = await prisma.tenants.findMany();
        res.json(tenants);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// ดึงข้อมูล Tenant ตาม i
const getTenant = async (req, res) => {
    const Tenant_ID = parseInt(req.params.Tenant_ID);

    try {
        const tenant = await prisma.tenants.findUnique({
            where: { Tenant_ID }
        });

        if (!tenant) {
            return res.status(404).json({
                status: "error",
                message: `Tenant with ID ${Tenant_ID} not found`
            });
        }

        res.json(tenant);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// อัปเดตข้อมูล Tenant
const updateTenant = async (req, res) => {
    const { Ten_name, Address, Room_ID, Contact_T_ID } = req.body;
    const Tenant_ID = parseInt(req.params.Tenant_ID);

    try {
        const updatedTenant = await prisma.tenants.update({
            where: { Tenant_ID },
            data: { Ten_name, Address, Room_ID, Contact_T_ID }
        });

        res.json({
            status: "ok",
            message: `Tenant with ID ${Tenant_ID} is updated`,
            tenant: updatedTenant
        });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                status: "error",
                message: `Tenant with ID ${Tenant_ID} not found`
            });
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// ✅]ลบ Tenant
const deleteTenant = async (req, res) => {
    const Tenant_ID = parseInt(req.params.Tenant_ID);

    try {
        await prisma.tenants.delete({
            where: { Tenant_ID }
        });

        res.json({
            status: "ok",
            message: `Tenant with ID ${Tenant_ID} is deleted`
        });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                status: "error",
                message: `Tenant with ID ${Tenant_ID} not found`
            });
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    createTenant,
    getTenants,
    getTenant,
    updateTenant,
    deleteTenant
};

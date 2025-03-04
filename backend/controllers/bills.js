const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ✅ ดึงข้อมูลค่าไฟทั้งหมด
const getElectricityBills = async (req, res) => {
    try {
        const bills = await prisma.electricity_bill.findMany();
        res.json(bills);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch electricity bills' });
    }
};

// ✅ ดึงข้อมูลค่าน้ำทั้งหมด
const getWaterBills = async (req, res) => {
    try {
        const bills = await prisma.water_bill.findMany();
        res.json(bills);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch water bills' });
    }
};

// ✅ ดึงข้อมูลค่าเช่าห้องทั้งหมด
const getRentBills = async (req, res) => {
    try {
        const bills = await prisma.rent_bill.findMany();
        res.json(bills);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch rent bills' });
    }
};

// ✅ เพิ่มค่าไฟใหม่
const createElectricityBill = async (req, res) => {
    const { Price, status, Tenant_ID } = req.body;

    try {
        const newBill = await prisma.electricity_bill.create({
            data: { Price, status, Tenant_ID }
        });

        res.status(201).json({ message: 'Electricity bill added', bill: newBill });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add electricity bill' });
    }
};

// ✅ เพิ่มค่าน้ำใหม่
const createWaterBill = async (req, res) => {
    const { Price, status, Tenant_ID } = req.body;

    try {
        const newBill = await prisma.water_bill.create({
            data: { Price, status, Tenant_ID }
        });

        res.status(201).json({ message: 'Water bill added', bill: newBill });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add water bill' });
    }
};

// ✅ เพิ่มค่าเช่าใหม่
const createRentBill = async (req, res) => {
    const { Price, status, Tenant_ID } = req.body;

    try {
        const newBill = await prisma.rent_bill.create({
            data: { Price, status, Tenant_ID }
        });

        res.status(201).json({ message: 'Rent bill added', bill: newBill });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add rent bill' });
    }
};

module.exports = {
    getElectricityBills,
    getWaterBills,
    getRentBills,
    createElectricityBill,
    createWaterBill,
    createRentBill
};

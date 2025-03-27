const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

console.log("complaintsController Loaded"); //  Debugging

//  ดึงข้อมูลคำร้องทุกประเภท 
const getAllComplaints = async (req, res) => {
    try {
        const [general, overstay, pets] = await Promise.all([
            prisma.complaint_general.findMany({ include: { tenants: true } }),
            prisma.complaint_overstay_request.findMany({ include: { tenants: true } }),
            prisma.complaint_asking_for_pets.findMany({ include: { tenants: true } })
        ]);

        const complaints = [
            ...general.map(c => ({
                id: c.ComplaintG_ID,
                type: c.Complaint_type,
                detail: c.Complaint_Detail,
                tenant_name: c.tenants?.Ten_name || "ไม่ระบุ",
                room_number: c.tenants?.Room_ID || "ไม่ระบุ",
                date: c.createdAt || "ไม่ระบุ",
                status: "ดำเนินการแล้ว"
            })),
            ...overstay.map(c => ({
                id: c.ComplaintOR_ID,
                type: "คำร้องขออยู่เกินกำหนด",
                detail: `ขอต่อสัญญา ${c.Requested_Extension}, เหตุผล: ${c.Reason}`,
                tenant_name: c.tenants?.Ten_name || "ไม่ระบุ",
                room_number: c.tenants?.Room_ID || "ไม่ระบุ",
                date: c.Original_End_Date || "ไม่ระบุ",
                status: "อยู่ระหว่างดำเนินการ"
            })),
            ...pets.map(c => ({
                id: c.ComplaintAP_ID,
                type: "คำร้องขอเลี้ยงสัตว์",
                detail: `ประเภท: ${c.Pet_Type}, จำนวน: ${c.Pet_Count} ตัว, สายพันธุ์: ${c.Pet_Breed}`,
                tenant_name: c.tenants?.Ten_name || "ไม่ระบุ",
                room_number: c.tenants?.Room_ID || "ไม่ระบุ",
                date: c.createdAt || "ไม่ระบุ",
                status: "กำลังดำเนินการ"
            }))
        ];

        res.json(complaints);
    } catch (error) {
        console.error(" Error fetching complaints:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ดึงข้อมูลคำร้อง
const getComplaintById = async (req, res) => {
    const { id } = req.params;
    try {
        let complaint = await prisma.complaint_general.findUnique({
            where: { ComplaintG_ID: id },
            include: { tenants: true }
        });

        if (!complaint) {
            complaint = await prisma.complaint_overstay_request.findUnique({
                where: { ComplaintOR_ID: id },
                include: { tenants: true }
            });

            if (complaint) {
                complaint = {
                    id: complaint.ComplaintOR_ID,
                    type: "คำร้องขออยู่เกินกำหนด",
                    detail: `ขอต่อสัญญา ${complaint.Requested_Extension}, เหตุผล: ${complaint.Reason}`,
                    tenant_name: complaint.tenants?.Ten_name || "ไม่ระบุ",
                    room_number: complaint.tenants?.Room_ID || "ไม่ระบุ",
                    old_contract_end: complaint.Original_End_Date || "ไม่ระบุ",
                    new_contract_end: complaint.New_End_Date || "ไม่ระบุ",
                    status: "อยู่ระหว่างดำเนินการ"
                };
            }
        }

        if (!complaint) {
            complaint = await prisma.complaint_asking_for_pets.findUnique({
                where: { ComplaintAP_ID: id },
                include: { tenants: true }
            });

            if (complaint) {
                complaint = {
                    id: complaint.ComplaintAP_ID,
                    type: "คำร้องขอเลี้ยงสัตว์",
                    detail: `ประเภท: ${complaint.Pet_Type}, จำนวน: ${complaint.Pet_Count} ตัว, สายพันธุ์: ${complaint.Pet_Breed}`,
                    tenant_name: complaint.tenants?.Ten_name || "ไม่ระบุ",
                    room_number: complaint.tenants?.Room_ID || "ไม่ระบุ",
                    pet_type: complaint.Pet_Type,
                    pet_count: complaint.Pet_Count,
                    status: "กำลังดำเนินการ"
                };
            }
        }

        if (!complaint) {
            return res.status(404).json({ error: "ไม่พบข้อมูลคำร้อง" });
        }

        res.json(complaint);
    } catch (error) {
        console.error(" Error fetching complaint by ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//  เพิ่มคำร้องทั่วไป
const createGeneralComplaint = async (req, res) => {
    try {
        const { Complaint_type, Complaint_Detail, Tenant_ID } = req.body;
        const newComplaint = await prisma.complaint_general.create({
            data: { Complaint_type, Complaint_Detail, Tenant_ID }
        });
        res.status(201).json({ message: 'General complaint added', complaint: newComplaint });
    } catch (error) {
        console.error(" Error creating general complaint:", error);
        res.status(500).json({ error: 'Failed to add complaint' });
    }
};

//  เพิ่มคำร้องขอเลี้ยงสัตว์
const createPetComplaint = async (req, res) => {
    try {
        const { Pet_Type, Pet_Breed, Pet_Age, Pet_Count, ComplaintAP_Detail, Tenant_ID } = req.body;
        const newComplaint = await prisma.complaint_asking_for_pets.create({
            data: { Pet_Type, Pet_Breed, Pet_Age, Pet_Count, ComplaintAP_Detail, Tenant_ID }
        });
        res.status(201).json({ message: 'Pet complaint added', complaint: newComplaint });
    } catch (error) {
        console.error(" Error creating pet complaint:", error);
        res.status(500).json({ error: 'Failed to add pet complaint' });
    }
};

//  เพิ่มคำร้องขออยู่เกินกำหนด
const createOverstayComplaint = async (req, res) => {
    try {
        const { Original_End_Date, Requested_Extension, New_End_Date, Reason, Tenant_ID } = req.body;
        const newComplaint = await prisma.complaint_overstay_request.create({
            data: { Original_End_Date, Requested_Extension, New_End_Date, Reason, Tenant_ID }
        });
        res.status(201).json({ message: 'Overstay complaint added', complaint: newComplaint });
    } catch (error) {
        console.error(" Error creating overstay complaint:", error);
        res.status(500).json({ error: 'Failed to add overstay complaint' });
    }
};


console.log({
    getAllComplaints,
    getComplaintById,
    createGeneralComplaint,
    createPetComplaint,
    createOverstayComplaint
});

module.exports = {
    getAllComplaints,
    getComplaintById,
    createGeneralComplaint,
    createPetComplaint,
    createOverstayComplaint
};

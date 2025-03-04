const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ✅ ดึงข้อมูลห้องพักทั้งหมด
const getRooms = async (req, res) => {
    try {
        const rooms = await prisma.rooms.findMany();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch rooms' });
    }
};

// ✅ ดึงข้อมูลห้องพักตาม ID
const getRoomById = async (req, res) => {
    try {
        const room = await prisma.rooms.findUnique({
            where: { Room_ID: req.params.Room_ID },
        });

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.json(room);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch room' });
    }
};

module.exports = { getRooms, getRoomById };

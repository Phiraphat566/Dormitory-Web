document.addEventListener("DOMContentLoaded", function () {
    // Doughnut Chart (ห้องที่มีผู้พักอาศัย vs ห้องที่ว่าง)
    var ctx1 = document.getElementById("roomChart").getContext("2d");
    new Chart(ctx1, {
        type: "doughnut",
        data: {
            labels: ["ห้องที่มีผู้พักอาศัย", "ห้องที่ว่างอยู่"],
            datasets: [{
                data: [55.9, 44.1],
                backgroundColor: ["#55CBCD", "#D3D3D3"],
                borderWidth: 1,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top",
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                },
            },
        },
    });

    // Line Chart (ค่าใช้จ่ายรวมค่าน้ำค่าไฟรายปี)
    var ctx2 = document.getElementById("yearlyChart").getContext("2d");
    new Chart(ctx2, {
        type: "line",
        data: {
            labels: [
                "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม",
                "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
            ],
            datasets: [{
                label: "ค่าใช้จ่ายรายเดือน",
                data: [
                    254103, 169497, 165432, 112534, 127457, 214509,
                    224537, 194564, 185456, 179945, 172719, 175891
                ],
                borderColor: "#FF5733",
                borderWidth: 2,
                fill: false,
                pointRadius: 4,
                tension: 0.4
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top",
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: "#E5E5E5"
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
        },
    });
});

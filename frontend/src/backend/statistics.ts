import Statistics from '../types/Statistics';

const statistics = {
    get
}

export default statistics;

export async function get() : Promise<Statistics> {
    return {
        numberOfTicketsSold: {
            prevValue: 900,
            value: 1000
        },
        numberOfMembers: 2,
        revenue: {
            prevValue: 1000,
            value: 1100
        },
        monthlyRevenue: [
            //{ year: 2023, month: 0, value: 10000 },
            //{ year: 2023, month: 1, value: 20000 },
            { year: 2023, month: 2, value: 10000 },
            { year: 2023, month: 3, value: 15000 }
        ],
        filmRevenue: [
            {title: "SIÊU LỪA GẶP SIÊU LẦY- C16", value: 120},
            {title: "ANH EM SUPER MARIO", value: 312},
            {title: "KHÓA CHẶT CỬA NÀO SUZUME", value: 202},
            {title: "KHẮC TINH CỦA QUỶ- C18", value: 130},
            {title: "CUỘC CHIẾN BẤT TỬ", value: 268},
        ]
        
    }

}
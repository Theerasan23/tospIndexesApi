const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4000;
const host = process.env.HOST;
const bearor = process.env.BEARER;

app.use(cors());
app.use(express.json());

app.get(`/api/`, async (req, res) => {

    try {
        return res.status(200).json({ status: 1, data: " api is running " });

    } catch (error) {
        console.log("/api/ is error");
    }

});

app.get('/moc-indexes/cpig', async (req, res) => {

    const start_year = 1977;
    const base_year = 2019;
    const years = 2024

    const body = JSON.stringify({
        YearBase: null,
        Period: {
            "StartYear": start_year + 543,
            "StartMonth": 1,
            "EndYear": years + 543,
            "EndMonth": 12
        },
        TimeOption: true,
        Types: ["TG"],
        Categories: ["00000"],
    });

    const url = 'https://index-api.tpso.go.th/api/cpig/filter';

    try {
        const result = await axios.post(url, body, {
            headers: {
                "Accept": "*/*",
                "User-Agent": "tpso (https://tpso.go.th/)",
                "Content-Type": "application/json",
                "Authorization": `${bearor}`
            },
            imeout: 10000
        });

        const commodities = await result.data;
        if (!Array.isArray(commodities) || commodities.length === 0) {
            return res.status(404).json({ message: 'No commodities found' });
        }
        const generateData = commodities.flatMap(commodity => {

            return commodity.years.flatMap(yearData => {

                return yearData.months.map(monthData => ({
                    index_id: commodity.commodityCode.padStart(16, '0'),
                    index_description: "รวมทุกรายการ",
                    region_id: 5,
                    region_name: "ประเทศ",
                    base_year: base_year,
                    year: yearData.year - 543,
                    month: monthData.month,
                    price_index: monthData.index,
                    mon: monthData.change,
                    yoy: monthData.changeYear,
                    aoa: monthData.changeAVG,
                }));
            });
        });

        const sortedData = generateData.sort((a, b) => {
            if (a.year === b.year) {
                return a.month - b.month;
            }
            return a.year - b.year;
        });

        return res.json(sortedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.get('/moc-indexes/cpig-core', async (req, res) => {

    const start_year = 1977;
    const base_year = 2019;
    const years = 2024


    const body = JSON.stringify({
        YearBase: null,
        Period: {
            "StartYear": start_year + 543,
            "StartMonth": 1,
            "EndYear": years + 543,
            "EndMonth": 12
        },
        TimeOption: true,
        Types: ["TG"],
        Categories: ["93000"]
    });

    const url = 'https://index-api.tpso.go.th/api/cpig/filter';
    try {
        const result = await axios.post(url, body, {
            headers: {
                "Accept": "*/*",
                "User-Agent": "tpso (https://tpso.go.th/)",
                "Content-Type": "application/json",
                "Authorization": `${bearor}`
            },
            imeout: 10000
        });

        const commodities = await result.data;
        if (!Array.isArray(commodities) || commodities.length === 0) {
            return res.status(404).json({ message: 'No commodities found' });
        }
        const generateData = commodities.flatMap(commodity => {

            return commodity.years.flatMap(yearData => {

                return yearData.months.map(monthData => ({
                    index_id: commodity.commodityCode.padStart(16, '0'),
                    index_description: "รวมทุกรายการ",
                    region_id: 5,
                    region_name: "ประเทศ",
                    base_year: base_year,
                    year: yearData.year - 543,
                    month: monthData.month,
                    price_index: monthData.index,
                    mon: monthData.change,
                    yoy: monthData.changeYear,
                    aoa: monthData.changeAVG,
                }));
            });
        });

        const sortedData = generateData.sort((a, b) => {
            if (a.year === b.year) {
                return a.month - b.month;
            }
            return a.year - b.year;
        });

        return res.json(sortedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.get('/moc-indexes/ppicpa', async (req, res) => {

    const start_year = 1977;
    const base_year = 2019;
    const years = 2024
    const body = JSON.stringify({

        SpecificTimes: [
            [2565, 3],
            [2567, 9]
        ],
        TimeOption: true,
        Types: ["CPA"],
        Categories: ["0000",]
    });
    const url = 'https://index-api.tpso.go.th/api/ppi/filter';
    try {
        const result = await axios.post(url, body, {
            headers: {
                "Accept": "*/*",
                "User-Agent": "tpso (https://tpso.go.th/)",
                "Content-Type": "application/json",
                "Authorization": `${bearor}`
            },
            imeout: 10000
        });

        const commodities = await result.data;
        if (!Array.isArray(commodities) || commodities.length === 0) {
            return res.status(404).json({ message: 'No commodities found' });
        }
        const generateData = commodities.flatMap(commodity => {

            return commodity.years.flatMap(yearData => {

                return yearData.months.map(monthData => ({
                    index_id: commodity.commodityCode.padStart(16, '0'),
                    index_description: "รวมทุกรายการ",
                    region_id: 5,
                    region_name: "ประเทศ",
                    base_year: base_year,
                    year: yearData.year - 543,
                    month: monthData.month,
                    price_index: monthData.index,
                    mon: monthData.change,
                    yoy: monthData.changeYear,
                    aoa: monthData.changeAVG,
                }));
            });
        });

        const sortedData = generateData.sort((a, b) => {
            if (a.year === b.year) {
                return a.month - b.month;
            }
            return a.year - b.year;
        });

        return res.json(sortedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.get('/moc-indexes/cmi', async (req, res) => {

    const start_year = 1977;
    const base_year = 2019;
    const years = 2024

    const body = JSON.stringify({

        YearBase: null,
        TimeOption: true,
        SpecificTimes: [[2567, 1], [2567, 7]],
        Categories: ["0"]
    });

    const url = 'https://index-api.tpso.go.th/api/cmi/filter';

    try {
        const result = await axios.post(url, body, {
            headers: {
                "Accept": "*/*",
                "User-Agent": "tpso (https://tpso.go.th/)",
                "Content-Type": "application/json",
                "Authorization": `${bearor}`
            },
            imeout: 10000
        });

        const commodities = await result.data;
        if (!Array.isArray(commodities) || commodities.length === 0) {
            return res.status(404).json({ message: 'No commodities found' });
        }
        const generateData = commodities.flatMap(commodity => {

            return commodity.years.flatMap(yearData => {

                return yearData.months.map(monthData => ({
                    index_id: commodity.commodityCode.padStart(16, '0'),
                    index_description: "รวมทุกรายการ",
                    region_id: 5,
                    region_name: "ประเทศ",
                    base_year: base_year,
                    year: yearData.year - 543,
                    month: monthData.month,
                    price_index: monthData.index,
                    mon: monthData.change,
                    yoy: monthData.changeYear,
                    aoa: monthData.changeAVG,
                }));
            });
        });

        const sortedData = generateData.sort((a, b) => {
            if (a.year === b.year) {
                return a.month - b.month;
            }
            return a.year - b.year;
        });

        return res.json(sortedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.get('/api/cci', async (req, res) => {

    const start_year = 1977;
    const base_year = 2019;
    const years = 2024
    const body = JSON.stringify({

        SpecificTimes: [
            [2565, 3],
            [2567, 9]
        ],
        TimeOption: true,
        Types: ["CPA"],
        Categories: ["0000",]
    });
    const url = 'https://index-api.tpso.go.th/api/ppi/filter';
    try {
        const result = await axios.post(url, body, {
            headers: {
                "Accept": "*/*",
                "User-Agent": "tpso (https://tpso.go.th/)",
                "Content-Type": "application/json",
                "Authorization": `${bearor}`
            },
            imeout: 10000
        });

        const commodities = await result.data;
        if (!Array.isArray(commodities) || commodities.length === 0) {
            return res.status(404).json({ message: 'No commodities found' });
        }
        const generateData = commodities.flatMap(commodity => {

            return commodity.years.flatMap(yearData => {

                return yearData.months.map(monthData => ({
                    index_id: commodity.commodityCode.padStart(16, '0'),
                    index_description: "รวมทุกรายการ",
                    region_id: 5,
                    region_name: "ประเทศ",
                    base_year: base_year,
                    year: yearData.year - 543,
                    month: monthData.month,
                    price_index: monthData.index,
                    mon: monthData.change,
                    yoy: monthData.changeYear,
                    aoa: monthData.changeAVG,
                }));
            });
        });

        const sortedData = generateData.sort((a, b) => {
            if (a.year === b.year) {
                return a.month - b.month;
            }
            return a.year - b.year;
        });

        return res.json(sortedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.get('/moc-indexes/imi', async (req, res) => {

    const start_year = 1977;
    const base_year = 2019;
    const years = 2024
    const body = JSON.stringify({
        YearBase: null,
        Period: {
            StartYear: 2567,
            StartMonth: 1,
            EndYear: 2567,
            EndMonth: 12
        },
        TimeOption: true,
        Types: ["IMI"],
        Categories: ["000"]
    });
    const url = 'https://index-api.tpso.go.th/api/imex/filter';
    try {
        const result = await axios.post(url, body, {
            headers: {
                "Accept": "*/*",
                "User-Agent": "tpso (https://tpso.go.th/)",
                "Content-Type": "application/json",
                "Authorization": `${bearor}`
            },
            imeout: 10000
        });

        const commodities = await result.data;
        if (!Array.isArray(commodities) || commodities.length === 0) {
            return res.status(404).json({ message: 'No commodities found' });
        }
        const generateData = commodities.flatMap(commodity => {

            return commodity.years.flatMap(yearData => {

                return yearData.months.map(monthData => ({
                    
                    index_id: commodity.commodityCode.padStart(16, '0'),
                    index_description: "รวมทุกรายการ",
                    region_id: 5,
                    region_name: "ประเทศ",
                    base_year: base_year,
                    year: yearData.year - 543,
                    month: monthData.month,
                    price_index: monthData.indexD,
                    mon: monthData.changeD,
                    yoy: monthData.changeYearD,
                    aoa: monthData.changeAVGD,
                }));
            });
        });

        const sortedData = generateData.sort((a, b) => {
            if (a.year === b.year) {
                return a.month - b.month;
            }
            return a.year - b.year;
        });

        return res.json(sortedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://${host}:${PORT}`);
});
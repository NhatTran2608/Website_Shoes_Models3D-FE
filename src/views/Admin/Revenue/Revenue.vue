<template>
    <div>
        <Menu></Menu>
    </div>
    <div class="title_Warehouse">
        <div>
            <h2>BIỂU ĐỒ THỂ HIỆN DOANH THU THEO NGÀY/THÁNG</h2>
        </div>
        <label class="mr-2 mt-3" for="month">Doanh thu của tháng: </label>
        <select name="" id="month" v-model="selectedMonth" @change="updateChartData">
            <option v-for="(month, index) in 12" :key="index" :value="index + 1">
                {{ `Tháng ${index + 1}` }}
            </option>
        </select>
        <div class="The_present_time">
            <i>
                Hôm nay là ngày {{ this.day }} tháng {{ this.month }} năm {{ this.year }}
            </i>
        </div>
        <hr>
        <div style="width: 100%;">
            <canvas style="width: 100%; height: 500px; display: math;" ref="revenueChart"></canvas>
        </div>
    </div>
</template>
  
<script>
import Chart from 'chart.js/auto';
import HistoryService from '../../../service/History';
import Menu from '../../../components/HeaderAdmin/Header.vue';
export default {
    components: {
        Menu
    },
    data() {
        return {
            revenueData: {
                daily: []
            },
            day: '',
            year: '',
            month: '',
            selectedMonth: null,
            chart: null
        };
    },
    async mounted() {
        const currentDate = new Date();
        this.day = currentDate.getDate(); // Lấy ngày
        this.month = currentDate.getMonth() + 1; // Lấy tháng (chú ý: phương thức getMonth() trả về tháng từ 0 đến 11, nên cần cộng thêm 1)
        this.year = currentDate.getFullYear(); // Lấy năm
        this.selectedMonth = currentDate.getMonth() + 1;
        await this.updateChartData();
    },
    methods: {
        async updateChartData() {
            this.revenueData.daily = [];
            try {
                const res = await HistoryService.getAllHistory();
                const transactions = res.data.filter(item => {
                    const updatedAt = new Date(item.updatedAt);
                    return updatedAt.getMonth() + 1 === this.selectedMonth;
                });
                const dailyRevenueMap = new Map();
                transactions.forEach(item => {
                    const updatedAt = new Date(item.updatedAt);
                    const day = updatedAt.getDate();
                    if (dailyRevenueMap.has(day)) {

                        dailyRevenueMap.set(day, dailyRevenueMap.get(day) + item.cart_items.total);
                    } else {

                        dailyRevenueMap.set(day, item.cart_items.total);
                    }
                });

                const labels = [];
                const data = [];

                for (let i = 1; i <= 31; i++) {

                    labels.push(i);
                    data.push(dailyRevenueMap.has(i) ? dailyRevenueMap.get(i) : 0);
                }
                this.revenueData.labels = labels;
                this.revenueData.daily = data;
                this.renderChart();
            } catch (err) {
                console.error(err);
            }
        },
        renderChart() {
            const ctx = this.$refs.revenueChart.getContext('2d');
            if (this.chart) {
                this.chart.destroy();
            }
            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.generateLabels(),
                    datasets: [{
                        label: 'Doanh thu theo ngày',
                        data: this.revenueData.daily,
                        borderColor: 'red',
                        backgroundColor: 'transparent',
                        tension: 0.2
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }

            });
        },
        generateLabels() {
            const currentDate = new Date();
            const daysInMonth = new Date(currentDate.getFullYear(), this.selectedMonth, 0).getDate();
            const labels = [];

            for (let i = 1; i <= daysInMonth; i++) {
                labels.push(`${currentDate.getFullYear()}-${('0' + this.selectedMonth).slice(-2)}-${('0' + i).slice(-2)}`);
            }

            return labels;
        }
    }
};
</script>
  
<style scoped>
.title_Warehouse {
    margin-left: 280px;

}

.The_present_time {
    float: right;
}
</style>
  
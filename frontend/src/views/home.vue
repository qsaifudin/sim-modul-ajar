<template>
  <v-app>
    <v-row>
      <v-col cols="12">
        <dashboard-datatable></dashboard-datatable>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiPoll, mdiLabelVariantOutline, mdiCurrencyUsd, mdiHelpCircleOutline } from '@mdi/js'
import StatisticsCardVertical from '@/components/statistics-card/StatisticsCardVertical.vue'

// demos
import DashboardCongratulationJohn from './dashboard/DashboardCongratulationJohn.vue'
import DashboardStatisticsCard from './dashboard/DashboardStatisticsCard.vue'
import DashboardCardTotalEarning from './dashboard/DashboardCardTotalEarning.vue'
import DashboardCardDepositAndWithdraw from './dashboard/DashboardCardDepositAndWithdraw.vue'
import DashboardCardSalesByCountries from './dashboard/DashboardCardSalesByCountries.vue'
import DashboardWeeklyOverview from './dashboard/DashboardWeeklyOverview.vue'
import DashboardDatatable from './dashboard/DashboardDatatable.vue'

export default {
  name: 'home',
  components: {
    StatisticsCardVertical,
    DashboardCongratulationJohn,
    DashboardStatisticsCard,
    DashboardCardTotalEarning,
    DashboardCardDepositAndWithdraw,
    DashboardCardSalesByCountries,
    DashboardWeeklyOverview,
    DashboardDatatable,
  },
  setup() {
    const totalProfit = {
      statTitle: 'Total Profit',
      icon: mdiPoll,
      color: 'success',
      subtitle: 'Weekly Project',
      statistics: '$25.6k',
      change: '+42%',
    }

    const totalSales = {
      statTitle: 'Refunds',
      icon: mdiCurrencyUsd,
      color: 'secondary',
      subtitle: 'Past Month',
      statistics: '$78',
      change: '-15%',
    }

    // vertical card options
    const newProject = {
      statTitle: 'New Project',
      icon: mdiLabelVariantOutline,
      color: 'primary',
      subtitle: 'Yearly Project',
      statistics: '862',
      change: '-18%',
    }

    const salesQueries = {
      statTitle: 'Sales Quries',
      icon: mdiHelpCircleOutline,
      color: 'warning',
      subtitle: 'Last week',
      statistics: '15',
      change: '-18%',
    }

    return {
      totalProfit,
      totalSales,
      newProject,
      salesQueries,
    }
  },
}
</script>

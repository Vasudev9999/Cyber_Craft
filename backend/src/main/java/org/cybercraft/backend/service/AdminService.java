package org.cybercraft.backend.service;

import org.cybercraft.backend.entity.Order;
import org.cybercraft.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {

    @Autowired
    private OrderRepository orderRepository;

    /**
     * Retrieves all orders ordered by the date they were ordered, descending.
     *
     * @return List of all orders.
     */
    public List<Order> getAllOrders() {
        return orderRepository.findAllOrders();
    }

    /**
     * Computes profit data.
     *
     * @return Map containing monthlyProfit, yearlyProfit, and allTimeProfit.
     */
    public Map<String, Double> getProfitData() {
        Double monthlyProfit = orderRepository.getMonthlyProfit();
        Double yearlyProfit = orderRepository.getYearlyProfit();
        Double allTimeProfit = orderRepository.getAllTimeProfit();

        // Handle nulls
        monthlyProfit = monthlyProfit != null ? monthlyProfit : 0.0;
        yearlyProfit = yearlyProfit != null ? yearlyProfit : 0.0;
        allTimeProfit = allTimeProfit != null ? allTimeProfit : 0.0;

        Map<String, Double> profitData = new HashMap<>();
        profitData.put("monthlyProfit", monthlyProfit);
        profitData.put("yearlyProfit", yearlyProfit);
        profitData.put("allTimeProfit", allTimeProfit);

        return profitData;
    }

    /**
     * Computes statistics data.
     *
     * @return Map containing totalSales and totalCustomers.
     */
    public Map<String, Object> getStatisticsData() {
        Double totalSales = orderRepository.getTotalSales();
        Long totalCustomers = orderRepository.getTotalCustomers();

        // Handle nulls
        totalSales = totalSales != null ? totalSales : 0.0;
        totalCustomers = totalCustomers != null ? totalCustomers : 0L;

        Map<String, Object> statisticsData = new HashMap<>();
        statisticsData.put("totalSales", totalSales);
        statisticsData.put("totalCustomers", totalCustomers);

        return statisticsData;
    }
}
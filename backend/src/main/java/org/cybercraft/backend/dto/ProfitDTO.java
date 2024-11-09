package org.cybercraft.backend.dto;

public class ProfitDTO {
    private double monthlyProfit;
    private double yearlyProfit;
    private double allTimeProfit;

    // Constructors
    public ProfitDTO() {}

    public ProfitDTO(double monthlyProfit, double yearlyProfit, double allTimeProfit) {
        this.monthlyProfit = monthlyProfit;
        this.yearlyProfit = yearlyProfit;
        this.allTimeProfit = allTimeProfit;
    }

    // Getters and Setters
    public double getMonthlyProfit() {
        return monthlyProfit;
    }

    public void setMonthlyProfit(double monthlyProfit) {
        this.monthlyProfit = monthlyProfit;
    }

    public double getYearlyProfit() {
        return yearlyProfit;
    }

    public void setYearlyProfit(double yearlyProfit) {
        this.yearlyProfit = yearlyProfit;
    }

    public double getAllTimeProfit() {
        return allTimeProfit;
    }

    public void setAllTimeProfit(double allTimeProfit) {
        this.allTimeProfit = allTimeProfit;
    }
}
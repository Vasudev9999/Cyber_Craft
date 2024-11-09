package org.cybercraft.backend.repository;

import org.cybercraft.backend.entity.Order;
import org.cybercraft.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Order entity.
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    /**
     * Retrieve all orders ordered by the date they were ordered, descending.
     *
     * @return List of all orders.
     */
    @Query("SELECT o FROM Order o ORDER BY o.orderedAt DESC")
    List<Order> findAllOrders();

    /**
     * Find an order by its ID and associated User.
     *
     * @param id   The ID of the order.
     * @param user The User who placed the order.
     * @return Optional containing the Order if found, else empty.
     */
    Optional<Order> findByIdAndUser(Long id, User user);

    /**
     * Find all orders associated with a specific User.
     *
     * @param user The User whose orders are to be retrieved.
     * @return List of Orders placed by the given User.
     */
    List<Order> findByUser(User user);

    /**
     * Calculate the total profit for the current month where payment status is 'Completed'.
     *
     * @return Sum of (price * quantity) for all order items in the current month.
     */
    @Query("SELECT SUM(oi.price * oi.quantity) FROM Order o JOIN o.orderItems oi " +
            "WHERE FUNCTION('MONTH', o.orderedAt) = FUNCTION('MONTH', CURRENT_DATE) " +
            "AND FUNCTION('YEAR', o.orderedAt) = FUNCTION('YEAR', CURRENT_DATE) " +
            "AND o.paymentStatus = 'Completed'")
    Double getMonthlyProfit();

    /**
     * Calculate the total profit for the current year where payment status is 'Completed'.
     *
     * @return Sum of (price * quantity) for all order items in the current year.
     */
    @Query("SELECT SUM(oi.price * oi.quantity) FROM Order o JOIN o.orderItems oi " +
            "WHERE FUNCTION('YEAR', o.orderedAt) = FUNCTION('YEAR', CURRENT_DATE) " +
            "AND o.paymentStatus = 'Completed'")
    Double getYearlyProfit();

    /**
     * Calculate the total profit across all time where payment status is 'Completed'.
     *
     * @return Sum of (price * quantity) for all order items.
     */
    @Query("SELECT SUM(oi.price * oi.quantity) FROM Order o JOIN o.orderItems oi " +
            "WHERE o.paymentStatus = 'Completed'")
    Double getAllTimeProfit();

    /**
     * Calculate the total sales across all time where payment status is 'Completed'.
     *
     * @return Sum of (price * quantity) for all order items.
     */
    @Query("SELECT SUM(oi.price * oi.quantity) FROM Order o JOIN o.orderItems oi " +
            "WHERE o.paymentStatus = 'Completed'")
    Double getTotalSales();

    /**
     * Calculate the total number of distinct customers who have completed orders.
     *
     * @return Count of distinct users who have placed completed orders.
     */
    @Query("SELECT COUNT(DISTINCT o.user) FROM Order o " +
            "WHERE o.paymentStatus = 'Completed'")
    Long getTotalCustomers();
}
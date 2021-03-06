/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ussu.pims.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ussu.pims.DAO.DashboardDAO;
import ussu.pims.Model.ChartDataPoint;
import ussu.pims.Model.LeaderboardDataPoint;

/**
 *
 * @author danielroy
 */
@Service
public class DashboardService {
    
    @Autowired
    private DashboardDAO dashboardDAO;
    
    public List<ChartDataPoint> getAllTests7Days(int userId) {
        return dashboardDAO.getAllTests7Days(userId);
    }
    
    public List<ChartDataPoint> getAllTests14Days(int userId) {
        return dashboardDAO.getAllTests14Days(userId);
    }

    public List<ChartDataPoint> getAllTests1Year(int userID) {
        return dashboardDAO.getAllTests1Year(userID);
    }

    public List<LeaderboardDataPoint> oneYearPatLeaderboard() {
        return dashboardDAO.oneYearPatLeaderboard();
    }

    public List<LeaderboardDataPoint> allTimePatLeaderboard() {
        return dashboardDAO.allTimePatLeaderboard();
    }

    public int myMonthTests(int userId) {
        return dashboardDAO.myMonthTests(userId);
    }

    public int myYearTests(int userId) {
        return dashboardDAO.myYearTests(userId);
    }

    public int everyoneYearTests() {
        return dashboardDAO.everyoneYearTests();
    }
    
}

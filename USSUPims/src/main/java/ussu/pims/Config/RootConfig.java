/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ussu.pims.Config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.stereotype.Controller;

/**
 *
 * @author danielroy
 */
@Configuration
@ComponentScan(value = {"ussu.pims"}, excludeFilters = {@ComponentScan.Filter(Controller.class)})
@Import({AppProperties.class} )
public class RootConfig {
    
}

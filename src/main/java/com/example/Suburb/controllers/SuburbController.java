package com.example.Suburb.controllers;

import com.example.Suburb.models.Suburb;
import com.example.Suburb.services.SuburbService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class SuburbController {


    @Autowired
    private SuburbService suburbService;


    private static Logger LOGGER = LogManager.getLogger(SuburbController.class);


    // add list of Suburb
    @PostMapping(path = "/addSuburb", produces = "application/json")
    public Map addUpdateUser(@RequestBody List<Suburb> suburb) {
        LOGGER.info(" ---- ADD SUBURB [START] ----");
        Map<String, Object> responseMap = new HashMap();

        try {
            if (suburb != null) {
                suburbService.addSuburb(suburb);
                responseMap.put("Status_code", "00");
                responseMap.put("Status_description", "Suburb Added Successfully");
            } else {
                responseMap.put("Status_code", "01");
                responseMap.put("Status_description", "Failed to Add Suburb");
            }
        } catch (Exception e) {
            e.printStackTrace();
            responseMap.put("Status_code", "01");
            responseMap.put("Status_description", "Failed to Add Suburb");
        }
        LOGGER.info(" ---- ADD SUBURB [END] ----");
        return responseMap;
    }


    @GetMapping(path = "/getSuburbList", produces = "application/json")
    public Map getSuburbList(Integer start, Integer end) {
        LOGGER.info(" ---- GET SUBURB LIST [START] ----");
        Map<String, Object> responseMap = new HashMap();

        List<Suburb> suburbList = suburbService.getSuburbList(start, end);
        if (suburbList != null) {
            responseMap.put("Status_code", "00");
            responseMap.put("Suburb_List", suburbList);
        } else {
            responseMap.put("Status_code", "01");
            responseMap.put("Status_description", "Failed to Get Suburb List");
        }
        LOGGER.info(" ----  GET SUBURB LIST [END] ----");

        return responseMap;
    }


}

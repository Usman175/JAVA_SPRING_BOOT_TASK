package com.example.Suburb.services;

import com.example.Suburb.daos.SuburbDao;
import com.example.Suburb.models.Suburb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SuburbServiceImpl implements SuburbService{


    @Autowired
    private SuburbDao suburbDao;
    @Override
    public void addSuburb(List<Suburb> suburbList) {
        suburbDao.addSuburb(suburbList);
    }

    @Override
    public List<Suburb> getSuburbList(Integer start, Integer end) {
        return suburbDao.getSuburbList(start,end);
    }
}

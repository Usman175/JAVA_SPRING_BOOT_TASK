package com.example.Suburb.services;

import com.example.Suburb.models.Suburb;

import java.util.List;

public interface SuburbService {

    public void addSuburb(List<Suburb> suburbList);
    public List<Suburb> getSuburbList(Integer start,Integer end);
}

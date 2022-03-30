package com.example.Suburb.daos;

import com.example.Suburb.models.Suburb;

import java.util.List;

public interface SuburbDao {
    public void addSuburb(List<Suburb> suburbList);
    public List<Suburb> getSuburbList(Integer start,Integer end);
}

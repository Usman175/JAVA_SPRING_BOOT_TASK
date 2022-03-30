package com.example.Suburb.models;

import javax.persistence.*;

@Entity
@Table(name = "Suburb")
public class Suburb {

    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int Id;

    @Column(name = "SuburbName")
    private String suburbName;

    @Column(name = "PostCode")
    private Integer postCode;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getSuburbName() {
        return suburbName;
    }

    public void setSuburbName(String suburbName) {
        this.suburbName = suburbName;
    }

    public Integer getPostCode() {
        return postCode;
    }

    public void setPostCode(Integer postCode) {
        this.postCode = postCode;
    }
}



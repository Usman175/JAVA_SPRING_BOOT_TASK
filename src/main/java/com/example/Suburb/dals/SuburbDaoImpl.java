package com.example.Suburb.dals;

import com.example.Suburb.daos.SuburbDao;
import com.example.Suburb.models.Suburb;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class SuburbDaoImpl implements SuburbDao {

    @Autowired
    private SessionFactory sessionFactory;

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    private static Logger LOGGER = LogManager.getLogger(SuburbDaoImpl.class);


    @Override
    public void addSuburb(List<Suburb> suburbList) {
        int subId = 0;
        for (Suburb suburb : suburbList) {
            Session session = this.sessionFactory.getCurrentSession();
            session.beginTransaction();
            session.save(suburb);
            session.getTransaction().commit();
            subId = suburb.getId();
        }


    }

    @Override
    public List<Suburb> getSuburbList(Integer start, Integer end) {
        Session session = this.sessionFactory.getCurrentSession();
        List<Suburb> userList = new ArrayList<>();
        Query query;
        if (start != null && end != null) {
            query = session.createQuery("from Suburb where PostCode between :start and :end order by SuburbName asc ");
            query.setParameter("start", start);
            query.setParameter("end", end);
        } else {
            query = session.createQuery("from Suburb order by SuburbName asc ");
        }
        userList = (List<Suburb>) query.list();
        return userList;
    }
}

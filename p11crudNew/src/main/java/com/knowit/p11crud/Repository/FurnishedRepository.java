package com.knowit.p11crud.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.knowit.p11crud.Entity.Furnished;

@Repository
public interface FurnishedRepository extends JpaRepository<Furnished, Integer> {

}

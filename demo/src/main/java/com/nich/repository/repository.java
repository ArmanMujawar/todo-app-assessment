package com.nich.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nich.entity.Todo;

@Repository
public interface repository extends JpaRepository<Todo,Integer>{

}

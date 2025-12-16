package com.knowit.p11crud.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.knowit.p11crud.Entity.Chat;
import com.knowit.p11crud.Entity.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
    List<Message> findByChatOrderByTimestampAsc(Chat chat);
}

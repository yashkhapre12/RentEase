package com.knowit.p11crud.Entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Entity
@Data
@Table(name = "message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "messageid")
    private int messageId;

    @ManyToOne
    @JoinColumn(name = "chatid", nullable = false)
    @JsonIgnoreProperties("messages")
    private Chat chat;

    @ManyToOne
    @JoinColumn(name = "senderid", nullable = false)
    @JsonIgnoreProperties("messages")
    private User sender;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "timestamp", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp = new Date();
}

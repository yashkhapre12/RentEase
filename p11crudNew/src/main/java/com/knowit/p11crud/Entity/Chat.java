package com.knowit.p11crud.Entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Entity
@Data
@Table(name = "chat")
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatid")
    private int chatId;

    @ManyToOne
    @JoinColumn(name = "tenantid", nullable = false)
    @JsonIgnoreProperties("chats")
    private User tenant;

    @ManyToOne
    @JoinColumn(name = "landlordid", nullable = false)
    @JsonIgnoreProperties("chats")
    private User landlord;

    @ManyToOne
    @JoinColumn(name = "propertyid", nullable = false)
    @JsonIgnoreProperties("chats")
    private Property property;

    @Column(name = "created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();
    
    @OneToMany(mappedBy = "chat", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("chat")
    private List<Message> messages;
}
